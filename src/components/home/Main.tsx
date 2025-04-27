import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import CreateTodoContent from "../contents/bottomSheets/CreateTodoContent";
import { useTodoStore } from "@/store/useTodoStore";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { DatePicker } from "./DatePicker";
import { useCalendarStore } from "@/store/useCalendarStore";
import TodoList from "./TodoList";

dayjs.locale("ko");

export default function Main() {
  const { setTodoList } = useTodoStore();
  const { selectedDate } = useCalendarStore();
  const dateRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const savedTodo = localStorage.getItem("todoList");
    if (savedTodo) {
      setTodoList(JSON.parse(savedTodo));
    }
  }, []);

  const formatSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const [highlightedDate, setHighlightedDate] = useState<{
    [key: string]: boolean;
  }>({});

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

  return (
    <div className="w-full h-full relative">
      <DatePicker />
      {/* {noContentMsg && <div>{noContentMsg}</div>} */}
      {noContentMsg && (
        <p className="text-center text-gray-500">{noContentMsg}</p>
      )}
      <TodoList highlightedDate={highlightedDate} />
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
