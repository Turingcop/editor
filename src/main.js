import "./app.css"
import "./tiny.css"

// @ts-ignore
import App from "./App.svelte"

const app = new App({ target: document.getElementById("app") })

export default app
