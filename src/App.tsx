import { BrowserRouter } from "react-router-dom";

import ModalProvider from "src/context/ModalProvider";
import Router from "src/routes/Router";

import "./styles/global.css";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <Router />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
