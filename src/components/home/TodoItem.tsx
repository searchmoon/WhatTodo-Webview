import useLongPress from "@/hooks/useLongPress";
import { cn } from "@/lib/utils";
import { TodoState, useTodoStore } from "@/store/useTodoStore";
import BottomSheets from "../common/BottomSheets";
import { DrawerTrigger } from "../ui/drawer";
import { Check, PencilLine, Trash2 } from "lucide-react";
import TodoContent from "../contents/bottomSheets/TodoContent";
import { useState } from "react";

interface TodoItemProps {
  todo: TodoState;
  handlePressTodo: (todo: TodoState) => void;
  handleClickTodo: (todo: TodoState, e: React.MouseEvent) => void;
  handleDeleteTodo: (todoId: number) => void;
  handleUpdateTodo: (todo: TodoState) => void;
}

export default function TodoItem({
  todo,
  handlePressTodo,
  handleClickTodo,
  handleDeleteTodo,
  handleUpdateTodo,
}: TodoItemProps) {
  const [open, setOpen] = useState(false);
  const { currentTodo } = useTodoStore();
  const longPressEvents = useLongPress({
    onLongPress: () => handlePressTodo(todo),
    delay: 500,
    onClick: (e) => {
      e.preventDefault();
      handleClickTodo(todo, e);
    },
    todo: todo,
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
        {currentTodo?.id === todo.id ? (
          <div className="flex items-center text-gray-400">
            <button
              className="p-[2px] no-propagation cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(todo.id);
              }}
            >
              <Trash2 size="16" />
            </button>
            <BottomSheets
              drawTrigger={
                <DrawerTrigger
                  className="p-[2px] rounded-full bottom-0 right-0 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateTodo(todo);
                  }}
                >
                  <PencilLine size="16" />
                </DrawerTrigger>
              }
              drawerContent={(onClose) => (
                <TodoContent onClose={onClose} mode="update" />
              )}
              open={open}
              onOpenChange={setOpen}
            />
          </div>
        ) : (
          <div className="min-w-4">{todo.complete && <Check size="16" />}</div>
        )}
      </div>
    </li>
  );
}
