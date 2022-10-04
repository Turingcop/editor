<script lang="ts">
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import Select, { Option } from "@smui/select"
import Textfield from "@smui/textfield"
import { dummyDoc, type document } from "../../models/docs"
import type { SnackbarComponentDev } from "@smui/snackbar"
import type { Socket } from "socket.io-client"

export let currentDoc: document
export let currentId = ""
export let docs: document[]
export let socket: Socket
export let snackbar: SnackbarComponentDev
export let saveDoc: (doc: document, warning: SnackbarComponentDev) => Promise<string>
export let getDocs: () => Promise<document[]>

</script>

<div class="toolbar">
  <Textfield bind:value={currentDoc.title} type="text" label="Document Title" 
  on:keyup={() => {
    socket.emit("doc", currentDoc)
  }}
  />
    <Select label="Select document" bind:value={currentId} >
      {#if docs[0]._id}
        {#each docs as doc}
          <Option value={doc._id}>{doc.title}</Option>
        {/each}
      {/if}
    </Select>
  <button on:click={async () => {
 currentId = await saveDoc(currentDoc, snackbar)
 docs = [dummyDoc]
 docs = await getDocs()
}}><Fa size="2x" icon={faFloppyDisk} />Save</button>
</div>

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