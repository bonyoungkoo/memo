import { Stack, Typography } from "@mui/material";

/**
 * Header
 * @param title 헤더 타이틀
 * @returns ReactNode
 */
export default function Header({ title }: { title: string }) {
  return (
    <Stack justifyContent={"center"}>
      <Typography variant="h1">{title}</Typography>
    </Stack>
  );
}
