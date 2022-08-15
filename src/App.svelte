<script>
import Editor from "@tinymce/tinymce-svelte"
import Fa from "svelte-fa"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

let text

function save() {
  console.log(text)
}

</script>

<button on:click={save}><Fa size="2x" icon={faFloppyDisk} />Spara</button>

<main>
    <Editor bind:text={text} />
</main>

<style>
button {
  position: absolute;
  top: 1rem;
  padding: 1rem;
  display: flex;
  font-weight: 500;
  column-gap: 0.5rem;
  align-items: center;
}
  
main {
  width: calc(100%/1.5);
  height: 100%;
}
  
</style>
