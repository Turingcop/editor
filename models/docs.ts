/* global window, fetch */
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
      return "Something went wrong when fetching docs"
    }
  },

  insertDoc: async (document: object) => {
    console.log(document)
    try {
      await fetch(`${docsModel.baseUrl}/docs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document)
      })
      return "Document saved successfully"
    } catch (e) {
      console.log(e)
      return "Something went wrong saving the document"
    }
  }
}

export default docsModel
