import { create } from "zustand";

export interface TodoState {
  todo: string;
  date: Date;
  carryOver: boolean;
  id: number;
  complete: boolean;
}

interface TodoStore {
  todoList: TodoState[];
  setTodoList: (todoList: TodoState[]) => void;
  selectedId: number | null;
  setSelectedId: (selectedId: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todoList: [],
    setTodoList: (todoList: TodoState[]) => set({ todoList: todoList }),
    selectedId: null,
    setSelectedId: (selectedId: number) => set({ selectedId: selectedId }),
  };
});
