import { Typography } from "@mui/material";

export default function MemoTitle({title}: {title: string}) {

  return (
    <Typography 
      variant="h2"
      sx={{ 
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        wordBreak: 'break-word',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
    }}>
      {title}
    </Typography>
  )
}
