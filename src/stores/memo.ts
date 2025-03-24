import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * id 메모 key 값
 * title 메모 제목
 * content 메모 내용
 * createdAt 메모 작성일(수정일)
 */
export interface Memo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

type States = {
  memoList: Memo[];
};

type Actions = {
  actions: {
    add: (memo: Memo) => void;
    update: (memo: Memo) => void;
    remove: (id: number) => void;
    truncate: () => void;
  };
};

const initialState: States = {
  memoList: [],
};

/**
 * add 메모 추가
 * update 메모 수정
 * remove 메모 삭제
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
