import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useTodoStore } from "@/store/useTodoStore";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { DatePicker } from "./DatePicker";
import TodoList from "./TodoList";
import TodoContent from "../contents/bottomSheets/TodoContent";

dayjs.locale("ko");

export default function Main() {
  const { setTodoList } = useTodoStore();

  useEffect(() => {
    const savedTodo = localStorage.getItem("todoList");
    if (savedTodo) {
      setTodoList(JSON.parse(savedTodo));
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <DatePicker />
      <TodoList />
      <BottomSheets
        drawTrigger={
          <DrawerTrigger className="bg-gray-400 p-1 rounded-full absolute bottom-0 right-0 cursor-pointer">
            <Plus color="#fff" size={24} />
          </DrawerTrigger>
        }
        drawerContent={(onClose) => (
          <TodoContent onClose={onClose} mode="create" />
        )}
      />
    </div>
  );
}
