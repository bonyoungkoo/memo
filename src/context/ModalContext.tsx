import { createContext } from "react";

import { ModalProps } from "src/components/modal/DialogModal";

interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

/**
 * 모달 관련 상태를 관리하기 위한 React Context입니다.
 *
 * 모달을 여는 `openModal` 함수와 모달을 닫는 `closeModal` 함수에 대한 접근을 제공
 *
 * `openModal`: 모달을 여는 함수로, `ModalProps`를 인자로 받아 모달을 제어
 * `closeModal`: 모달을 닫는 함수
 *
 * @property {Function} openModal
 * @property {Function} closeModal
 */
const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
