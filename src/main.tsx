import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { createRoot } from "react-dom/client";
import App from "src/App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
