import { createContext } from "react";

import { ModalProps } from "src/components/modal/DialogModal";

interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
