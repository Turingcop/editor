<script lang="ts">
import Editor from "@tinymce/tinymce-svelte"
import Toolbar from "./components/Toolbar.svelte"
import type { document } from "../models/docs"

const initDoc: document = { _id: "", title: "", body: "" }
let currentDocument: document = initDoc
let currentId = ""

$: console.log(currentDocument)

</script>

<main>
  <p>*Bug warning: in order to display a document you've previously edited it might be necessary to focus the editor before selecting the document from the menu.</p>
    <Toolbar initDoc={initDoc} bind:currentDocument={currentDocument} bind:currentId={currentId}/>
    <Editor bind:value={currentDocument.body} on:execcommand={e => {
      if (e.detail.event.command === "mceNewDocument") {
            currentDocument = initDoc
            currentId = ""
          }
    }} />
</main>

<style>

p {
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 12px;
}
main {
  width: calc(100%/1.5);
  height: 100%;
}
</style>
