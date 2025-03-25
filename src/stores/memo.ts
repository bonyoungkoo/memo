import { create } from "zustand";
import { persist } from "zustand/middleware";

/** @interface Memo
 * @property {number} id - 메모의 고유 ID
 * @property {string} title - 메모의 제목
 * @property {string} content - 메모의 내용
 * @property {string} createdAt - 메모의 작성일(수정일) yyyy.MM.dd HH:mm
 */
export interface Memo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// 상태 타입 정의
type States = {
  memoList: Memo[];
};

// 액션 타입 정의
type Actions = {
  actions: {
    add: (memo: Memo) => void;
    update: (memo: Memo) => void;
    remove: (id: number) => void;
    truncate: () => void;
  };
};

// 초기 상태 정의
const initialState: States = {
  memoList: [],
};

/**
 * Action:
 * - add 메모 추가
 * - update 메모 수정
 * - remove 메모 삭제
 *
 * 상태는 `localStorage`에 지속적으로 저장되어 앱을 새로 고침하거나 다시 시작해도 이전 데이터를 유지합니다.
 */
const useMemoStore = create<States & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        add: (memo: Memo) =>
          set((state) => ({ memoList: [...state.memoList, memo] })),
        update: (memo: Memo) =>
          set((state) => {
            return {
              memoList: state.memoList.map((v) =>
                v.id === memo.id
                  ? {
                      id: memo.id,
                      title: memo.title,
                      content: memo.content,
                      createdAt: memo.createdAt,
                    }
                  : {
                      id: v.id,
                      title: v.title,
                      content: v.content,
                      createdAt: v.createdAt,
                    },
              ),
            };
          }),
        remove: (id: number) =>
          set((state) => {
            return { memoList: state.memoList.filter((v) => v.id !== id) };
          }),
        truncate: () => set(() => ({ memoList: [] })),
      },
    }),
    {
      name: "memo-storage",
      partialize: (state) => ({ memoList: state.memoList }),
    },
  ),
);

export default useMemoStore;
