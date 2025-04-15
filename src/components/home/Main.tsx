import { useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import CreateTodoContent from "../contents/bottomSheets/CreateTodoContent";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { formatGetDateLabel } from "@/util/format";

dayjs.locale("ko");

export default function Main() {
  useEffect(() => {
    const savedTodo = localStorage.getItem("todoList");
    if (savedTodo) {
      setTodoList(JSON.parse(savedTodo));
    }
  }, []);

  const { todoList, setTodoList } = useTodoStore();

  const sortedTodos = useMemo(
    () =>
      [...todoList].sort(
        (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
      ),
    [todoList]
  );

  const groupedByDate = sortedTodos.reduce(
    (acc: { [key: string]: TodoState[] }, todo) => {
      const dateKey = dayjs(todo.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(todo);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full h-full relative">
      {Object.entries(groupedByDate).map(([date, todos]) => (
        <div key={date}>
          <div>{formatGetDateLabel(date)}</div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="p-2 bg-gray-50 rounded shadow-sm">
                {todo.todo}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <BottomSheets
        drawTrigger={
          <DrawerTrigger className="bg-gray-400 p-1 rounded-full absolute bottom-0 right-0 cursor-pointer">
            <Plus color="#fff" size={24} />
          </DrawerTrigger>
        }
        drawerContent={<CreateTodoContent />}
      />
    </div>
  );
}
