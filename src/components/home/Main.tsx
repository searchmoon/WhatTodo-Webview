import { useEffect, useMemo, useRef } from "react";
import { Plus } from "lucide-react";
import CreateTodoContent from "../contents/bottomSheets/CreateTodoContent";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { formatGetDateLabel } from "@/util/format";
import { DatePicker } from "./DatePicker";
import { useCalendarStore } from "@/store/useCalendarStore";

dayjs.locale("ko");

export default function Main() {
  useEffect(() => {
    const savedTodo = localStorage.getItem("todoList");
    if (savedTodo) {
      setTodoList(JSON.parse(savedTodo));
    }
  }, []);

  const { todoList, setTodoList } = useTodoStore();
  const { selectedDate } = useCalendarStore();
  const dateRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
  console.log(groupedByDate);
  const formatSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
  console.log(formatSelectedDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = dateRef.current[formatSelectedDate];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [formatSelectedDate]);

  return (
    <div className="w-full h-full relative">
      <DatePicker />
      <div className="w-full h-[calc(100vh-170px)] overflow-y-scroll">
        {Object.entries(groupedByDate).map(([date, todos]) => {
          console.log(date);
          return (
            <div
              key={date}
              ref={(el) => {
                dateRef.current[date] = el;
              }}
              className="mb-4"
            >
              <div>{formatGetDateLabel(date)}</div>
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="p-2 bg-gray-50 rounded shadow-sm"
                  >
                    {todo.todo}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <BottomSheets
        drawTrigger={
          <DrawerTrigger className="bg-gray-400 p-1 rounded-full absolute bottom-0 right-0 cursor-pointer">
            <Plus color="#fff" size={24} />
          </DrawerTrigger>
        }
        drawerContent={(onClose) => <CreateTodoContent onClose={onClose} />}
      />
    </div>
  );
}
