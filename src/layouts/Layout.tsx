import { Box, Stack } from "@mui/material";

interface Layout {
  header?: React.ReactNode;
  body: React.ReactNode;
  // footer?: React.ReactNode;
}

export default function Layout({
  header,
  body,
  // footer,
}: Layout) {
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
