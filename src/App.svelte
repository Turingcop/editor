<script lang="ts">
import Editor from "@tinymce/tinymce-svelte"
import Toolbar from "./components/Toolbar.svelte"

let text: string

// (async () => {
//   const res = await docsModel.getDocs()

//   docs = res
// })()

</script>

<main>
    <Toolbar text={text} />
    <Editor bind:value={text} />
</main>

<style>  
main {
  width: calc(100%/1.5);
  height: 100%;
}
</style>
