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
  currentTodo: TodoState | undefined | null;
  setCurrentTodo: (currentTodo: TodoState | undefined | null) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todoList: [],
    setTodoList: (todoList: TodoState[]) => set({ todoList: todoList }),
    currentTodo: null,
    setCurrentTodo: (currentTodo: TodoState | undefined | null) =>
      set({ currentTodo: currentTodo }),
  };
});
