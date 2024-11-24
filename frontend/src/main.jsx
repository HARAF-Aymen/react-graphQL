import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ApolloProvider from "./provider/ApolloProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </StrictMode>
);