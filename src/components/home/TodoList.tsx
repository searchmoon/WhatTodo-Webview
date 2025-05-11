import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/store/useCalendarStore";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import { formatGetDateLabel } from "@/util/format";
import dayjs from "dayjs";
import { Check, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import TodoContent from "../contents/bottomSheets/TodoContent";
import useLongPress from "@/hooks/useLongPress";

export default function TodoList() {
  const { todoList, setTodoList, setSelectedId } = useTodoStore();
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
      const selectedDateMonth = dayjs(selectedDate).format("YYYY-MM");
      const dateKeyMonth = dayjs(todo.date).format("YYYY-MM");
      if (!acc[dateKey] && selectedDateMonth === dateKeyMonth)
        acc[dateKey] = [];
      if (selectedDateMonth === dateKeyMonth) acc[dateKey].push(todo);

      return acc;
    },
    {}
  );

  const [highlightedDate, setHighlightedDate] = useState<{
    [key: string]: boolean;
  }>({});

  const formatSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const [noContentMsg, setNoContentMsg] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = dateRef.current[formatSelectedDate];
      if (target) {
        // 캘린더에서 날짜 선택 시, 세로 스크롤 해당 위치로 이동.
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // 선택된 date 의 상태만 true 로 변경해주기
        setHighlightedDate({ [formatSelectedDate]: true });
        setNoContentMsg("");
      } else {
        setHighlightedDate({ [formatSelectedDate]: false });
        setNoContentMsg(`${formatSelectedDate} 에는 등록된 일정이 없습니다.`);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [formatSelectedDate]);

  // 메시지 몇초 후 자동 제거
  useEffect(() => {
    if (noContentMsg) {
      const msgTimer = setTimeout(() => {
        setNoContentMsg("");
      }, 1200);

      return () => clearTimeout(msgTimer);
    }
  }, [noContentMsg]); // noContentMsg가 변경될 때마다 실행

  const handleClickTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
    );

    setTodoList(newTodoList);
    setSelectedTodo(null);

    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const [selectedTodo, setSelectedTodo] = useState<TodoState | null>();

  const handlePressTodo = (todo: TodoState) => {
    if (selectedTodo === todo) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(todo);
    }
  };

  const handleDeleteTodo = (todoId: number) => {
    const newTodoList = todoList.filter((item) => item.id !== todoId);
    console.log(newTodoList);
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const handleUpdateTodo = (todoId: number) => {
    setSelectedId(todoId);
  };

  return (
    <div className="w-full h-[calc(100vh-170px)] overflow-y-scroll">
      <div className="h-5">
        <p
          className={`text-center py-[2px] my-1 rounded-sm text-sm text-white transition-colors duration-700 ${
            noContentMsg ? "bg-gray-400" : "opacity-0 "
          }`}
        >
          {noContentMsg}
        </p>
      </div>

      {Object.entries(groupedByDate).map(([date, todos]) => {
        return (
          <div
            key={date}
            ref={(el) => {
              dateRef.current[date] = el;
            }}
            className="mb-4"
          >
            <div
              className={`p-1 rounded-sm mb-1 transition-colors duration-700 ${
                highlightedDate[date] ? "bg-gray-200 shake" : ""
              }
              `}
            >
              {formatGetDateLabel(date)}
            </div>
            <ul className="space-y-2">
              {todos.map((todo) => {
                const longPressEvents = useLongPress({
                  onLongPress: () => handlePressTodo(todo),
                  delay: 500,
                  onClick: () => handleClickTodo(todo.id),
                });

                return (
                  <li
                    key={todo.id}
                    className={cn(
                      "px-3 py-1 bg-gray-50 rounded shadow-sm",
                      todo.complete ? "line-through text-gray-400" : ""
                    )}
                    {...longPressEvents}
                  >
                    <div className="flex items-center justify-between">
                      {todo.todo}
                      {selectedTodo?.id === todo.id ? (
                        <div className="flex items-center text-gray-400">
                          <button
                            className="p-[2px]"
                            onClick={() => handleDeleteTodo(todo.id)}
                          >
                            <Trash2 size="16" />
                          </button>
                          <BottomSheets
                            drawTrigger={
                              <DrawerTrigger
                                className="p-[2px] rounded-full bottom-0 right-0 cursor-pointer"
                                onClick={() => handleUpdateTodo(todo.id)}
                              >
                                <PencilLine size="16" />
                              </DrawerTrigger>
                            }
                            drawerContent={(onClose) => (
                              <TodoContent onClose={onClose} mode="update" />
                            )}
                          />
                        </div>
                      ) : (
                        <div className="min-w-4">
                          {todo.complete && <Check size="16" />}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
