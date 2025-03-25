import { Box, Stack } from "@mui/material";

interface Layout {
  header?: React.ReactNode;
  body: React.ReactNode;
  // footer?: React.ReactNode;
}

/**
 * Layout
 * 화면을 뷰포트에 맞추기 위한 레이아웃 컴포넌트
 * @param header 헤더
 * @param body 바디 (페이지 컴포넌트)
 * @returns {ReactNode}
 */
export default function Layout({ header, body }: Layout) {
  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "10%" }}
      >
        {header && header}
      </Stack>
      <Box sx={{ height: "90%", overflow: "auto" }}>{body && body}</Box>
    </Box>
  );
}
