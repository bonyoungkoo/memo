import { useState } from "react";

import Modal, { ModalProps } from "src/components/modal/DialogModal";
import ModalContext from "src/context/ModalContext";

/**
 * 모달 상태를 관리하고 제공하는 Provider 컴포넌트입니다.
 *
 * 모달을 여는 함수(`openModal`)와 모달을 닫는 함수(`closeModal`)를 하위 컴포넌트에게 제공
 * `isOpen` 상태를 기반으로 모달을 렌더링
 *
 * @param {ReactNode} children - `ModalProvider` 내부에 렌더링할 자식 컴포넌트
 *
 * @returns {ReactNode}
 */
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
