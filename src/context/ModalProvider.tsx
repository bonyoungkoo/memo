import { useState } from "react";

import Modal, { ModalProps } from "src/components/modal/DialogModal";
import ModalContext from "src/context/ModalContext";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalProps, setModalProps] = useState<ModalProps>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (props: ModalProps) => {
    setIsOpen(true);
    setModalProps({
      ...props,
    });
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && modalProps && <Modal {...modalProps} />}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
