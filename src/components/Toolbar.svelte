<script lang="ts">
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import Select, { Option } from "@smui/select"
import type { SnackbarComponentDev } from "@smui/snackbar"
import Snackbar, { Actions, Label } from "@smui/snackbar"
import Textfield from "@smui/textfield"
import docsModel, { type document } from "../../models/docs"

export let initDoc: document
export let currentDocument: document
export let currentId = ""

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
  return docs.filter(doc => doc._id === id)[0] ?? initDoc
}

async function saveDocument(id: string, title: string, body: string): Promise<void> {
  if (!title) {
    snackBarWarning.open()
    return
  }
  currentId = await docsModel.saveDocument({
    _id: id,
    title,
    body
  })

  await loadDocs()
}

$: currentDocument = getDoc(currentId)

</script>

<div class="toolbar">
  <Textfield bind:value={currentDocument.title} type="text" label="Document Title" />
    <Select label="Select document" bind:value={currentId} >
      {#if docs[0]._id}
        {#each docs as doc}
          <Option value={doc._id}>{doc.title}</Option>
        {/each}
      {/if}
    </Select>
  <button on:click={() => saveDocument(currentId, currentDocument.title, currentDocument.body)}><Fa size="2x" icon={faFloppyDisk} />Spara</button>
</div>
<Snackbar bind:this={snackBarWarning}>
  <Label>Please select a title for your document.</Label>
  <Actions>
  
  </Actions>
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