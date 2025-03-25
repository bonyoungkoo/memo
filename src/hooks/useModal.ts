import { useContext } from "react";

import ModalContext from "src/context/ModalContext";

/**
 * `ModalContext`에서 제공하는 모달 제어 기능을 사용할 수 있는 커스텀 훅입니다.
 *
 * @param ModalProps DialogModal.tsx 참고
 * @returns {openModal} 모달 열기
 * @returns {closeModal} 모달 종료
 */
export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
