import { Typography } from "@mui/material";

/**
 * MemoDate
 * @param date 메모 작성일(수정일) YYYY.MM.DD HH:mm
 * @returns ReactNode
 */
export default function MemoDate({ date }: { date: string }) {
  return <Typography variant="subtitle1">{date}</Typography>;
}
