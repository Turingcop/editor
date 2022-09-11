<script lang="ts">
import Editor from "@tinymce/tinymce-svelte"
import Toolbar from "./components/Toolbar.svelte"
import { onMount } from "svelte"
import type { document } from "../models/docs"
const initDoc: document = { _id: "", title: "", body: "" }
let currentDocument: document = initDoc
// let docBody = ""
// let docTitle = ""
// let currentId = ""

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function newDocument(e: any) {
  if (e.detail.event.command === "mceNewDocument") {
    currentDocument = initDoc
    // docTitle = ""
    // docBody = ""
    // currentId = ""
  }
}

// onMount(() => {
//   document.getElementById("tinymce-svelte_236793861662934085113_ifr")?.focus()
// })
</script>

<main>
    <Toolbar bind:docBody={docBody} bind:docTitle={docTitle} bind:currentId={currentId}/>
    <Editor bind:value={docBody} on:execcommand={e => newDocument(e)} />
</main>

<style>  
main {
  width: calc(100%/1.5);
  height: 100%;
}
</style>
