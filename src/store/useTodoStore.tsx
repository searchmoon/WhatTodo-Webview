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
  currentTodo: TodoState | undefined;
  setCurrentTodo: (currentTodo: TodoState) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todoList: [],
    setTodoList: (todoList: TodoState[]) => set({ todoList: todoList }),
    currentTodo: undefined,
    setCurrentTodo: (currentTodo: TodoState) =>
      set({ currentTodo: currentTodo }),
  };
});
