<script lang="ts">
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import Select, { Option } from "@smui/select"
import Textfield from "@smui/textfield"
import docsModel from "../../models/docs"

export let text: string

const docs = [{ _id: "hej", body: "<p>hejsan</p>" }]
let selected: string
let docTitle = ""

function save(data: string): void {
  console.log(data)
}

function saveDoc() {
  docsModel.insertDoc({
    title: docTitle,
    body: text
  })
}

function getDocBody(id: string): string {
  return docs.filter(doc => doc._id === id)[0].body
}
</script>

<div class="toolbar">
  <Textfield bind:value={docTitle} type="text" label="Document Title" />
    <Select label="Select document" bind:value={selected} on:change={() => {
      text = getDocBody(selected)
    }}>
    {#each docs as doc}
    <Option value={doc._id}>Hej</Option>
    {/each}
  </Select>
  <button on:click={() => save(text)}><Fa size="2x" icon={faFloppyDisk} />Spara</button>
  <button on:click={saveDoc}>Test</button>
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