/* global window, fetch */
export type document = {
  _id: string,
  title: string,
  body: string
}

const docsModel = {
  baseUrl: window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-siev20.azurewebsites.net",

  getDocs: async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await (await fetch(`${docsModel.baseUrl}/docs`)).json()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res
    } catch (e) {
      console.log(e)
      console.log("Something went wrong when fetching docs")
      return [{ _id: "", title: "", body: "" }]
    }
  },

  saveDocument: async (currentDocument: document): Promise<string> => {
    if (currentDocument._id) {
      return await docsModel.updateDocument(currentDocument)
    }
    return await docsModel.createDocument(currentDocument)
  },

  createDocument: async (currentDocument: object): Promise<string> => {
    try {
      const newId = await fetch(`${docsModel.baseUrl}/docs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDocument)
      }).then(res => res.json())

      console.log("New document created successfully")
      console.log(newId)
      return newId
    } catch (e) {
      console.log(e)
      console.log("Something when wrong when creating the document")
      return ""
    }
  },

  updateDocument: async (currentDocument: document): Promise<string> => {
    try {
      return await fetch(`${docsModel.baseUrl}/docs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDocument)
      }).then(() => currentDocument._id)
    } catch (e) {
      console.log("Something went wrong when updating the document")
      console.log(e)
      return currentDocument._id
    }
  }
}

export default docsModel
