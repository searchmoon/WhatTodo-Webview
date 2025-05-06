import { useState } from "react";
import { CalendarIcon } from "lucide-react";
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

const UpdateTodoContent = ({ onClose }: { onClose: () => void }) => {
  const { todoList, setTodoList, selectedId } = useTodoStore();

  const selectedTodo = todoList.find((item) => item.id === selectedId);

  const [updateTodo, setUpdateTodo] = useState<TodoState>(() => {
    return (
      selectedTodo ?? {
        todo: "",
        date: new Date(),
        carryOver: false,
        id: Date.now(),
        complete: false,
      }
    );
  });

  const handleUpdateTodo = () => {
    const prevTodoList = todoList.filter((todo) => todo.id !== updateTodo.id);
    if (updateTodo?.todo) {
      const newTodoList = [...prevTodoList, updateTodo];
      setTodoList(newTodoList);

      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      onClose();
    } else {
      alert("할일 수정에 실패했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTodo({ ...updateTodo, [e.target.id]: e.target.value });
  };

  const handleChangeSwitch = (checked: boolean) => {
    setUpdateTodo({ ...updateTodo, carryOver: checked });
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <div className="flex items-center gap-4">
        <InputLine
          onChange={handleChange}
          id="todo"
          value={updateTodo?.todo}
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
                !updateTodo?.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {updateTodo?.date ? (
                dayjs(updateTodo?.date).format("YYYY-MM-DD")
              ) : (
                <p>날짜를 선택하세요</p>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={updateTodo?.date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setUpdateTodo((prev) => ({
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
          checked={updateTodo?.carryOver}
          onCheckedChange={handleChangeSwitch}
        />
      </div>
      <button
        onClick={handleUpdateTodo}
        className="bg-gray-400 p-2 rounded-full cursor-pointer"
      >
        수정
      </button>
    </div>
  );
};

export default UpdateTodoContent;
