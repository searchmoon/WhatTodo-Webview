import { useState, useEffect } from "react";
import { ArrowUp, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import InputLine from "@/components/common/InputLine";
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

interface TodoContentProps {
  mode?: "create" | "update";
  onClose: () => void;
}

const TodoContent = ({ mode = "create", onClose }: TodoContentProps) => {
  const { todoList, setTodoList, currentTodo } = useTodoStore();

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
      return alert("할일을 작성해 주세요.");
    }

    let updatedList: TodoState[] = [];

    if (mode === "create") {
      const newItem = { ...todo, id: Date.now() };
      updatedList = [...todoList, newItem];
    } else if (mode === "update") {
      updatedList = todoList.map((item) => (item.id === todo.id ? todo : item));
    }

    setTodoList(updatedList);
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
    <div className="flex flex-col items-center gap-4 mb-10">
      <div className="flex items-center gap-4">
        <InputLine
          onChange={handleChange}
          id="todo"
          value={todo.todo}
          placeholder="할 일을 작성해 주세요."
        />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="due_date" className="text-right">
          날짜
        </Label>
        <Popover modal>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center w-[280px] justify-start text-left font-normal border rounded-md p-2",
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

      <button
        onClick={handleSubmit}
        className="bg-gray-400 p-2 rounded-full cursor-pointer"
      >
        {mode === "create" ? <ArrowUp color="#fff" /> : "수정"}
      </button>
    </div>
  );
};

export default TodoContent;
