import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import "@mantine/core/styles.css";
import App from "./app/App";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import AuthProvider from "./app/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MantineProvider
          theme={{
            black: "#252525",
            fontFamily: "Open Sans, sans-serif",
            headings: {
              fontFamily: "Raleway, sans-serif",
            },
            breakpoints: {
              sm: "576px",
              md: "768px",
              lg: "1024px",
              xl: "1280px",
              xxl: "1400px",
              "2xl": "1536px",
            },
          }}
          defaultColorScheme="dark"
        >
          <App />
          <Toaster position="top-center" richColors />
        </MantineProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
