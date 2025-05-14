import { useCalendarStore } from "@/store/useCalendarStore";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import { formatGetDateLabel } from "@/util/format";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todoList, setTodoList, setCurrentTodo } = useTodoStore();
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

  const handleClickTodo = (todo: TodoState) => {
    const newTodoList = todoList.map((item) =>
      item.id === todo.id ? { ...item, complete: !item.complete } : item
    );
    setTodoList(newTodoList);
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
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const handleUpdateTodo = (todo: TodoState) => {
    setCurrentTodo(todo);
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
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  selectedTodo={selectedTodo}
                  handlePressTodo={handlePressTodo}
                  handleClickTodo={handleClickTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  handleUpdateTodo={handleUpdateTodo}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
