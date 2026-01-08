import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, GroupProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <GroupProvider>
        <App />
      </GroupProvider>
    </AuthProvider>
  </StrictMode>
);
