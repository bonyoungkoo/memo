// import { memo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// interface MemoStore {
//   memoList: Memo[]
//   setMemoList: (memo: Memo) => void
// }

export interface Memo {
  title: string
  content: string
}

// interface MemoList {
//   memoList: Memo[]
// }

type States = {
  memoList: Memo[]
}

type Actions = {
  actions: {
    add: (memo: Memo) => void
    remove: (id: number) => void
  }
}

const initialState: States  = {
  memoList: [],
}

const useMemoStore = create(
  persist<States & Actions>(
    (set) => ({
      ...initialState,
      actions: {
        add: (memo: Memo) => set((state) => ({memoList: [...state.memoList, memo]})),
        remove: (id: number) => set((state) => {
          const prevList = state.memoList;
          console.log(id)
          // const newList = [];
          return {memoList: prevList};
        })
      }
    }),
    {
      name: 'memo-storage'
    }
  )
)

export default useMemoStore;