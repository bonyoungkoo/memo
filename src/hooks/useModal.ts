import { useContext } from "react";

import ModalContext from "src/context/ModalContext";

/**
 * @param ModalProps Modal.tsx 참고
 * @returns openModal 모달 열기
 * @returns closeModal 모달 종료
 */
export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
