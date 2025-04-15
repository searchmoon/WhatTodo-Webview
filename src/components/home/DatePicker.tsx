import { format, getDaysInMonth, startOfMonth, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useCalendarStore } from "@/store/useCalendarStore";

export function DatePicker() {
  // 초기 날짜를 오늘 날짜로 설정
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);
  const daysContainerRef = useRef<HTMLDivElement>(null);

  // 현재 월의 모든 날짜 생성
  const generateDaysInMonth = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = startOfMonth(date);
    const days: Date[] = [];

    for (let i = 0; i < daysInMonth; i++) {
      days.push(addDays(firstDay, i));
    }

    return days;
  };

  const days = generateDaysInMonth(currentMonth);

  // 이전 달로 이동
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  // 다음 달로 이동
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  // 날짜가 선택된 날짜와 같은지 확인 (선택된 날짜가 없으면 오늘 날짜 사용)
  const isSelected = (day: Date) => {
    // date가 항상 존재하므로 간단히 비교
    return day.toDateString() === selectedDate.toDateString();
  };

  // 컴포넌트 마운트 시 선택된 날짜 중앙 정렬
  useEffect(() => {
    // 초기 렌더링 후 선택된 날짜(오늘 날짜)를 중앙으로 스크롤
    setTimeout(() => {
      centerSelectedDate();
    }, 100); // 약간의 지연을 두어 DOM이 완전히 렌더링되도록 함
  }, []);

  // 월이 변경될 때 해당 월에 선택된 날짜가 있으면 중앙 정렬
  useEffect(() => {
    // 현재 선택된 날짜가 현재 표시된 월에 있는지 확인
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = new Date(currentMonthStart);
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
    currentMonthEnd.setDate(0);

    if (selectedDate >= currentMonthStart && selectedDate <= currentMonthEnd) {
      setTimeout(() => {
        centerSelectedDate();
      }, 100);
    }
  }, [currentMonth]);

  // 선택된 날짜를 중앙에 배치하는 함수
  const centerSelectedDate = () => {
    if (
      selectedButtonRef.current &&
      containerRef.current &&
      daysContainerRef.current
    ) {
      // 컨테이너의 너비
      const containerWidth = containerRef.current.offsetWidth;
      // 선택된 버튼의 위치 (컨테이너 내부 기준)
      const buttonLeft = selectedButtonRef.current.offsetLeft;
      // 선택된 버튼의 너비
      const buttonWidth = selectedButtonRef.current.offsetWidth;
      // 컨테이너의 패딩 (왼쪽)
      const containerPadding = Number.parseInt(
        window.getComputedStyle(daysContainerRef.current).paddingLeft || "0"
      );

      // 버튼이 정확히 중앙에 오도록 스크롤 위치 계산 (패딩 고려)
      const scrollPosition =
        buttonLeft - containerWidth / 2 + buttonWidth / 2 - containerPadding;

      // 부드러운 스크롤 적용
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // 날짜 선택 및 중앙 정렬 처리
  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);

    // 다음 렌더링 사이클에서 선택된 버튼을 중앙으로 스크롤
    setTimeout(() => {
      centerSelectedDate();
    }, 0);
  };

  // 버튼 ref 설정을 위한 콜백 함수
  const setButtonRef = (element: HTMLButtonElement | null, day: Date) => {
    if (element && day.toDateString() === selectedDate.toDateString()) {
      selectedButtonRef.current = element;
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-medium">{format(currentMonth, "yy년 MM월")}</div>
        <div className="flex">
          <Button
            variant="outline"
            size="smIcon"
            className="rounded-r-none"
            onClick={prevMonth}
          >
            <ChevronLeft className="cursor-pointer" size="22" />
          </Button>
          <Button
            variant="outline"
            size="smIcon"
            className="rounded-l-none border-l-0"
            onClick={nextMonth}
          >
            <ChevronRight className="cursor-pointer" size="22" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={daysContainerRef} className="flex space-x-1 min-w-max px-4">
          {days.map((day, i) => (
            <Button
              key={i}
              ref={(el) => setButtonRef(el, day)}
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 font-normal flex-shrink-0",
                isSelected(day) && "bg-primary text-primary-foreground",
                !isSelected(day) && "hover:bg-muted"
              )}
              onClick={() => handleDateSelect(day)}
            >
              <span className="text-sm">{format(day, "d")}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
