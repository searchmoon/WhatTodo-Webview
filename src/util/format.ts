import dayjs from "dayjs";

export const formatGetDateLabel = (dateStr: string) => {
  const target = dayjs(dateStr).startOf("day");
  const today = dayjs().startOf("day");

  const diff = target.diff(today, "day");

  if (diff === 0) return "오늘";
  if (diff === -1) return "어제";
  if (diff === 1) return "내일";

  return target.format("YY년 M월 D일 (dd)");
};
