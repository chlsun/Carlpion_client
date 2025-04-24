import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/include/ScrollToTop/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </BrowserRouter>
);
