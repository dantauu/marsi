import { createRoot } from "react-dom/client"
import App from "./app/app"
import "./app/styles/index.css"
import "./app/styles/fonts.css"

createRoot(document.getElementById("root")!).render(<App />)
