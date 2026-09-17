import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./api/store";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root")!;

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  // Prerendered page → hydrate
  hydrateRoot(rootElement, app);
} else {
  // Normal client-side load
  createRoot(rootElement).render(app);
}