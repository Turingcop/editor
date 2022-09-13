<svelte:options accessors={true}/>
<script lang="ts">
import Editor from "@tinymce/tinymce-svelte"
import Toolbar from "./components/Toolbar.svelte"
import type { document } from "../models/docs"

const initDoc: document = { _id: "", title: "", body: "" }
let currentDocument: document = initDoc
let currentId = ""
let editor: Editor

</script>

<main>
    <Toolbar editor={editor} initDoc={initDoc} bind:currentDocument={currentDocument} bind:currentId={currentId}/>
    <Editor bind:this={editor} bind:value={currentDocument.body} on:execcommand={e => {
      console.log(e)
      if (e.detail.event.command === "mceNewDocument") {
            currentId = ""
            currentDocument = initDoc
          }
    }} />
</main>

<style>

main {
  width: calc(100%/1.5);
  height: 100%;
}
</style>
