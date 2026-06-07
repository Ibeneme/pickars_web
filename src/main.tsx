import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import "./index.css";
import { store } from "./api/store";
import './assets/fonts/fonts.css'
import { HelmetProvider } from 'react-helmet-async'; // Imported safely

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider> {/* Added wrapper here */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider> {/* Closed wrapper here */}
    </Provider>
  </React.StrictMode>
);