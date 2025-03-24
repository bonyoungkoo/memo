// import { memo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// interface MemoStore {
//   memoList: Memo[]
//   setMemoList: (memo: Memo) => void
// }

export interface Memo {
  id: number
  title: string
  content: string
  createdAt: string
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
    update: (memo: Memo) => void
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
        update: (memo: Memo) => set((state) => {
          return {memoList: state.memoList.map(v => v.id === memo.id ? {id: memo.id, title: memo.title, content: memo.content, createdAt: memo.createdAt} : {id: v.id, title: v.title, content: v.content, createdAt: v.createdAt})}
        }),
        remove: (id: number) => set((state) => {
          return {memoList: state.memoList.filter(v => v.id !== id)}
        })
      }
    }),
    {
      name: 'memo-storage'
    }
  )
)

// const useMemoStore = create(
//   persist<States & Actions>(
//     (set) => ({
//       ...initialState,
//       actions: {
//         add: (memo: Memo) => set((state) => ({memoList: [...state.memoList, memo]})),
//         update: (memo: Memo) => set((state) => {
//           return {memoList: state.memoList.map(v => v.id === memo.id ? {id: memo.id, title: memo.title, content: memo.content, createdAt: memo.createdAt} : {id: v.id, title: v.title, content: v.content, createdAt: v.createdAt})}
//         }),
//         remove: (id: number) => set((state) => {
//           return {memoList: state.memoList.filter(v => v.id !== id)}
//         })
//       }
//     }),
//     {
//       name: 'memo-storage'
//     }
//   )
// )

// const useMemoStore = create<States & Actions>((
//     (set) => ({
//       ...initialState,
//       actions: {
//         add: (memo: Memo) => set((state) => ({memoList: [...state.memoList, memo]})),
//         update: (memo: Memo) => set((state) => {
//           return {memoList: state.memoList.map(v => v.id === memo.id ? {id: memo.id, title: memo.title, content: memo.content, createdAt: memo.createdAt} : {id: v.id, title: v.title, content: v.content, createdAt: v.createdAt})}
//         }),
//         remove: (id: number) => set((state) => {
//           return {memoList: state.memoList.filter(v => v.id !== id)}})
//       }
//     })
    
//   )
// )


export default useMemoStore;