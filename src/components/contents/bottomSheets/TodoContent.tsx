import { useState, useEffect } from "react";
import { ArrowUp, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";

interface TodoContentProps {
  mode?: "create" | "update";
  onClose: () => void;
}

const TodoContent = ({ mode = "create", onClose }: TodoContentProps) => {
  const { todoList, setTodoList, currentTodo, setCurrentTodo } = useTodoStore();

  const selectedTodo = todoList.find((item) => item.id === currentTodo?.id);

  const [todo, setTodo] = useState<TodoState>({
    todo: "",
    date: new Date(),
    carryOver: true,
    id: 0,
    complete: false,
  });

  useEffect(() => {
    if (mode === "update" && selectedTodo?.id !== todo.id && selectedTodo) {
      setTodo(selectedTodo);
    }
  }, [mode, selectedTodo]);

  const handleSubmit = () => {
    if (!todo.todo.trim()) {
      return alert("할 일을 작성해 주세요.");
    }

    let updatedList: TodoState[] = [];

    if (mode === "create") {
      const newItem = { ...todo, id: Date.now() };
      updatedList = [...todoList, newItem];
    } else if (mode === "update") {
      updatedList = todoList.map((item) => (item.id === todo.id ? todo : item));
    }

    setTodoList(updatedList);
    setCurrentTodo(null);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeSwitch = (checked: boolean) => {
    setTodo({ ...todo, carryOver: checked });
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-10 px-4">
      <div className="flex flex-col w-full ">
        <Popover modal>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-start text-left font-normal px-3 ",
                !todo.date && "text-muted-foreground"
              )}
            >
              <div className="flex items-center border border-b-0 rounded-t-xl rounded-b-none pt-1 pb-0.5 px-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {todo.date ? (
                  dayjs(todo.date).format("MM-DD (dd)")
                ) : (
                  <p>날짜를 선택하세요</p>
                )}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 no-propagation">
            <Calendar
              mode="single"
              selected={todo.date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setTodo((prev) => ({ ...prev, date: selectedDate }));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="space-y-0 mb-4">
          <div className="relative">
            <Input
              id="todo"
              value={todo.todo}
              type="text"
              placeholder="할 일을 작성해 주세요."
              onChange={handleChange}
              className="pr-12 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl h-12 text-base"
              noneFocus={true}
            />
            <button
              onClick={handleSubmit}
              className="no-propagation absolute right-2 top-1/2 -translate-y-1/2 bg-gray-400 hover:bg-gray-600 transition-colors p-1 rounded-full cursor-pointer h-fit"
              disabled={!todo.todo.trim() || !todo.date}
            >
              {mode === "create" ? (
                <ArrowUp size="20" color="#fff" />
              ) : (
                <span className="text-white px-1">수정</span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Label htmlFor="carry_over" className="text-right">
            일정 미루기 허용
          </Label>
          <Switch
            id="carry_over"
            checked={todo.carryOver}
            onCheckedChange={handleChangeSwitch}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
