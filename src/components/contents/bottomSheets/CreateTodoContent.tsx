import { useState } from "react";
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
import { useTodoStore } from "@/store/useTodoStore";
import dayjs from "dayjs";

const TodoInput = () => {
  const { todoList, setTodoList } = useTodoStore();

  const [newTodo, setNewTodo] = useState({
    todo: "",
    date: new Date(),
    carryOver: true,
    id: null,
  });

  const handleCreateTodo = () => {
    if (newTodo.todo) {
      setTodoList([...todoList, { ...newTodo, id: Date.now() }]);
      localStorage.setItem(
        "todoList",
        JSON.stringify([...todoList, { ...newTodo, id: Date.now() }])
      );
    } else {
      alert("할일을 작성해 주세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.id]: e.target.value });
  };

  const handleChangeSwitch = (checked: boolean) => {
    setNewTodo({ ...newTodo, carryOver: checked });
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <div className="flex items-center gap-4">
        <InputLine
          onChange={handleChange}
          id="todo"
          value={newTodo.todo}
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
                !newTodo.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newTodo.date ? (
                dayjs(newTodo.date).format("YYYY-MM-DD")
              ) : (
                <p>날짜를 선택하세요</p>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={newTodo.date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setNewTodo((prev) => ({
                    ...prev,
                    date: selectedDate,
                  }));
                }
              }}
              onDayFocus={() => console.log("focused")}
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
          checked={newTodo.carryOver}
          onCheckedChange={handleChangeSwitch}
        />
      </div>
      <button
        onClick={handleCreateTodo}
        className="bg-gray-400 p-2 rounded-full cursor-pointer"
      >
        <ArrowUp color="#fff" />
      </button>
    </div>
  );
};

export default TodoInput;
