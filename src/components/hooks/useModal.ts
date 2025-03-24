import { useContext } from "react";
import ModalContext from "src/context/ModalContext";

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
