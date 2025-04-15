import { create } from "zustand";

interface CalendarProp {
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
}

export const useCalendarStore = create<CalendarProp>((set) => {
  return {
    selectedDate: new Date(),
    setSelectedDate: (selectedDate: Date) =>
      set({ selectedDate: selectedDate }),
  };
});
