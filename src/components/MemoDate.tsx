import { Typography } from "@mui/material";

export default function MemoDate({ date }: { date: string }) {
  return <Typography variant="subtitle1">{date}</Typography>;
}
