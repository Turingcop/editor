<svelte:options immutable/>
<script lang="ts">
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import Select, { Option } from "@smui/select"
import type { SnackbarComponentDev } from "@smui/snackbar"
import Snackbar, { Actions, Label } from "@smui/snackbar"
import Textfield from "@smui/textfield"
import docsModel, { type document } from "../../models/docs"

export let docTitle = ""
export let currentId = ""
export let docBody = ""

const initDoc: document = { _id: "", title: "", body: "" }
let currentDocument: document = initDoc
let docs: document[] = [initDoc]
let snackBarWarning: SnackbarComponentDev

async function loadDocs(): Promise<void> {
  docs = [initDoc]
  docs = await docsModel.getDocs()
  console.log(docs)
}

loadDocs()

function save(data: string): void {
  console.log(data)
}

async function saveDocument(id: string, title: string, body: string): Promise<void> {
  console.log(id)
  if (!title) {
    snackBarWarning.open()
    return
  }
  currentId = await docsModel.saveDocument({
    _id: id,
    title,
    body
  }).then(res => res)
  loadDocs()
}

function getDoc(id: string): document {
  console.log("Getting doc")

  return docs.filter(doc => doc._id === id)[0] ?? initDoc
}

$: currentDocument = getDoc(currentId)
$: console.log(docBody)
$: docTitle = currentDocument.title
$: docBody = currentDocument.body

</script>

<div class="toolbar">
  <Textfield bind:value={docTitle} type="text" label="Document Title" />
    <Select label="Select document" bind:value={currentId} >
      {#if docs[0]._id}
        {#each docs as doc}
          <Option value={doc._id}>{doc.title}</Option>
        {/each}
      {/if}
    </Select>
  <button on:click={() => save(docBody)}><Fa size="2x" icon={faFloppyDisk} />Spara</button>
  <button on:click={() => saveDocument(currentId, docTitle, docBody)}>Test</button>
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