import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AudioProvider } from "./context/AudioContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer />
    </AudioProvider>
  </StrictMode>
);
