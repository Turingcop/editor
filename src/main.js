import "./app.css"
import "./tiny.css"
import "../node_modules/@smui/select/bare.css"
import "../node_modules/@smui/textfield/bare.css"
import "./smui.css"

import App from "./App.svelte"

const app = new App({ target: document.getElementById("app") })

export default app
