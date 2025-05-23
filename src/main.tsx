import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../src/app/styles/index.css"
import App from "./app/app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
