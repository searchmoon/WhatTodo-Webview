import dayjs from "dayjs";

export const formatGetDateLabel = (dateStr: string) => {
  const target = dayjs(dateStr).startOf("day");
  const today = dayjs().startOf("day");
  const diff = target.diff(today, "day");
  const formattedDate = target.format("D일 (dd)");

  if (diff === -1) return `${formattedDate} - 어제`;
  if (diff === 0) return `${formattedDate} - 오늘`;
  if (diff === 1) return `${formattedDate} - 내일`;

  return formattedDate;
};
