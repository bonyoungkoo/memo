import { Typography } from "@mui/material";

/**
 * MemoContent
 * @param content 메모 내용
 * @returns {ReactNode}
 */
export default function MemoContent({ content }: { content: string }) {
  return (
    <Typography
      variant="body1"
      sx={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        wordBreak: "break-word",
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
      }}
    >
      {content}
    </Typography>
  );
}
