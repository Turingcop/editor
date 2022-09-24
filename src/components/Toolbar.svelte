<script lang="ts">
import type Editor from "@tinymce/tinymce-svelte"
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import Select, { Option } from "@smui/select"
import type { SnackbarComponentDev } from "@smui/snackbar"
import Snackbar, { Label } from "@smui/snackbar"
import Textfield from "@smui/textfield"
import docsModel, { type document } from "../../models/docs"

export let initDoc: document
export let currentDocument: document
export let currentId = ""
export let editor: Editor

let docs: document[] = [initDoc]
let snackBarWarning: SnackbarComponentDev

async function loadDocs(): Promise<void> {
  docs = [initDoc]
  docs = await docsModel.getDocs()
  if (docs.length === 0) {
    docs = [initDoc]
  }
}

loadDocs()

function getDoc(id: string): document {
  try {
    editor.$$.ctx[3].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].contentDocument.body.focus()
  } catch (e) {
    console.log("Editor not loaded yet")
  }
  return docs.filter(doc => doc._id === id)[0] ?? initDoc
}

async function saveDocument(doc: document): Promise<void> {
  if (!doc.title) {
    snackBarWarning.open()
    return
  }
  currentId = await docsModel.saveDocument(doc)

  await loadDocs()
}

$: currentDocument = getDoc(currentId)

</script>

<div class="toolbar">
  <Textfield data-testid="hej" bind:value={currentDocument.title} type="text" label="Document Title" ></Textfield>
    <Select label="Select document" bind:value={currentId} >
      {#if docs[0]._id}
        {#each docs as doc}
          <Option value={doc._id}>{doc.title}</Option>
        {/each}
      {/if}
    </Select>
  <button on:click={() => saveDocument(currentDocument)}><Fa size="2x" icon={faFloppyDisk} />Spara</button>
</div>
<Snackbar data-testid="warning" bind:this={snackBarWarning}>
  <Label>Please select a title for your document.</Label>
</Snackbar>

<style>
  div {
    display: flex;
    gap: 1rem;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }

  button {
  padding: 0.5rem 1rem;
  display: flex;
  font-weight: 500;
  column-gap: 0.5rem;
  align-items: center;
  }
</style>