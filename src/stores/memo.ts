import { create } from "zustand";
import { persist } from "zustand/middleware";

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
                    }
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
    }
  )
);

export default useMemoStore;
