<script lang="ts">
import type { SnackbarComponentDev } from "@smui/snackbar"
import Snackbar, { Actions, Label } from "@smui/snackbar"

export let label: string
export let snackBarWarning: SnackbarComponentDev

</script>
<Snackbar bind:this={snackBarWarning}>
<Label>{label}</Label>
<Actions>
</Actions>
</Snackbar>