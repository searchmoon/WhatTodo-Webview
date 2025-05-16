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
    carryOver: false,
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
      <div className="flex w-full gap-2 items-center">
        <div className="flex flex-col gap-3 w-full">
          <Input
            value={todo.todo}
            type="text"
            placeholder="할 일을 작성해 주세요."
            onChange={handleChange}
            className="w-full"
          />

          <Popover modal>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center w-full justify-start text-left font-normal border rounded-md p-2",
                  !todo.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {todo.date ? (
                  dayjs(todo.date).format("YYYY-MM-DD")
                ) : (
                  <p>날짜를 선택하세요</p>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
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
        </div>

        <button
          onClick={handleSubmit}
          className="bg-gray-400 p-2 rounded-full cursor-pointer h-fit"
        >
          {mode === "create" ? <ArrowUp color="#fff" /> : "수정"}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="carry_over" className="text-right">
          다음날로 일정 넘기기
        </Label>
        <Switch
          id="carry_over"
          checked={todo.carryOver}
          onCheckedChange={handleChangeSwitch}
        />
      </div>
    </div>
  );
};

export default TodoContent;
