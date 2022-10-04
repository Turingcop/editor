/* global window, fetch */
import type { SnackbarComponentDev } from "@smui/snackbar"

export type document = {
  _id: string,
  title: string,
  body: string
}

export const dummyDoc: document = { _id: "", title: "", body: "" }

const docsModel = {
  baseUrl: window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1")
    ? "http://localhost:1337"
    : "https://jsramverk-editor-siev20.azurewebsites.net",

  getDocs: async () => {
    try {
      const res = await (await fetch(`${docsModel.baseUrl}/docs`)).json()

      if (res.length === 0) {
        return [dummyDoc]
      }

      return res
    } catch (e) {
      console.log(e)
      console.log("Something went wrong when fetching docs")
      return [dummyDoc]
    }
  },

  filterDocs: (id: string, docs: document[], editor: any): document => {
    const currentDoc = docs.filter(doc => doc._id === id)[0] ?? dummyDoc

    try {
      editor.focus()
      editor.setContent(currentDoc.body)
    } catch (e) {
      console.log("Editor not initialized")
    }

    return currentDoc
  },

  getEdits: async (id: string, current: document): Promise<document> => {
    try {
      const res = await (await fetch(`${docsModel.baseUrl}/docs/${id}`)).json()

      if (res.data) {
        return res.data
      }
      return current
    } catch (e) {
      return current
    }
  },

  saveDocument: async (currentDocument: document, warning: SnackbarComponentDev): Promise<string> => {
    if (!currentDocument.title) {
      warning.open()
      return currentDocument._id
    }
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
