import { Stack, Typography } from "@mui/material";

export default function Header({title}: {title: string}) {
  return (
    <Stack justifyContent={'center'}>
      <Typography variant="h1">{title}</Typography>
    </Stack>
  )
}
