<script lang="ts">
import Toolbar from "./components/Toolbar.svelte"
import docsModel, { dummyDoc, type document } from "../models/docs"
import { io, Socket } from "socket.io-client"
import { onMount } from "svelte"
import type { SnackbarComponentDev } from "@smui/snackbar"
import Snackbar, { Label } from "@smui/snackbar"
import Editor from "@tinymce/tinymce-svelte"

const socketServer = docsModel.baseUrl
let currentDoc: document = dummyDoc
let currentId = ""
let docs: document[] = [dummyDoc]
let snackBarWarning: SnackbarComponentDev
let socket: Socket
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let editor: any

function changeDoc(id: string) {
  currentDoc = docsModel.filterDocs(id, docs, editor)
}

async function getEdits(id: string) {
  currentDoc = await docsModel.getEdits(id, currentDoc)
  try {
    editor.setContent(currentDoc.body)
  } catch (e) {
    console.log("Editor not initialized")
  }
}

function createRoom(id: string) {
  if (socket) {
    socket.emit("create", id)
  }
}

onMount(async () => {
  docs = await docsModel.getDocs()
  socket = io(socketServer, { transports: ["websocket", "polling", "flashsocket"] })

  socket.on("doc", (data: document) => {
    const bookmark = editor.selection.getBookmark(2, true)

    currentDoc.title = data.title
    currentDoc.body = data.body
    editor.setContent(currentDoc.body)
    editor.selection.moveToBookmark(bookmark)
  })
})

$: createRoom(currentId)
$: changeDoc(currentId)
$: getEdits(currentId)

</script>

<main>
    <Toolbar 
      socket={socket} 
      snackbar={snackBarWarning} 
      saveDoc={docsModel.saveDocument}
      getDocs={docsModel.getDocs}
      docs={docs} 
      bind:currentDoc={currentDoc}
      bind:currentId={currentId}
    />

    <Editor 
      on:execcommand={e => {
        if (e.detail.event.command === "mceNewDocument") {
          currentId = ""
          currentDoc = dummyDoc
          return
        }
        if (e.detail.event.command !== "mceFocus") {
          currentDoc.body = editor.getContent()
          socket.emit("doc", currentDoc)
        }
      }}
      on:keyup={() => {
        currentDoc.body = editor.getContent()
        socket.emit("doc", currentDoc)
      }}
      on:init={e => {
        editor = e.detail.editor
      }}
    />
    <Snackbar bind:this={snackBarWarning}>
      <Label>Please select a title for your document.</Label>
    </Snackbar>
</main>

<style>

main {
  width: calc(100%/1.5);
  height: 100%;
}

</style>
