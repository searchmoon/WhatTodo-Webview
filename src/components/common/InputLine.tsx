import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputLineProps extends React.ComponentProps<"input"> {
  isError?: boolean;
  message?: string;
  disabled?: boolean;
  type?: string;
}

export default function InputLine({
  isError,
  message,
  disabled,
  type = "text",
  ...props
}: InputLineProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePwdVisibility = () => setShowPassword(!showPassword);
  const inputType =
    type === "password" ? (showPassword === true ? "text" : "password") : type;

  return (
    <div>
      <div className="flex-column relative w-full">
        <input
          type={inputType}
          className={`flex-grow placeholder:text-grayScale04 caret-subBlue border-grayScale03 ${
            isError && "border-subRed focus:border-subRed"
          } focus:border-grayScale08 text-grayScale10 h-[34px] w-full border-b px-1 py-2 text-[15px] placeholder:text-[15px] focus:outline-none ${
            disabled && "bg:grayScale10 pointer-events-none cursor-not-allowed"
          }`}
          {...props}
        />
        <button
          className="absolute top-1/2 right-1 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer"
          onClick={togglePwdVisibility}
        >
          {type === "password" && (showPassword ? <EyeOff /> : <Eye />)}
        </button>
      </div>
      {message && (
        <span
          className={`${
            isError ? "text-subRed" : "text-subBlue"
          } mt-1 flex h-4 items-center pl-1 text-[13px]`}
        >
          {message}
        </span>
      )}
    </div>
  );
}
