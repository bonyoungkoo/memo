import { BrowserRouter } from "react-router-dom";
import Router from "src/routes/Router";
import "./styles/global.css";
import ModalProvider from "src/context/ModalProvider";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
