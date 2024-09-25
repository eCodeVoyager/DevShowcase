import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import "@mantine/core/styles.css";
import App from "./app/App";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      theme={{
        black: "#252525",
      }}
      defaultColorScheme="dark"
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
