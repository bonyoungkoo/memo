import { Divider, IconButton, Paper, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import MemoTitle from "./MemoTitle";
import MemoDate from "./MemoDate";
import MemoContent from "./MemoContent";
import { Memo } from "../stores/memo";

export default function MemoItem({item, onClickEditButton}: {item: Memo, onClickEditButton: () => void}) {
  return (
    <Paper sx={{ height: '100px', width: '100%', display: 'flex', flexDirection: 'column' }} variant="outlined">
      <Stack direction="row" sx={{ height: '150px', width: '100%' }}>
        <Stack sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', width: '90%' }}>
          <Stack sx={{ height: '60%', padding: '12px', backgroundColor: '#F8F8F7' }}>
            <MemoTitle title={item.title} />
            
          </Stack>
          <Divider />
          <Stack direction={'column'} flexGrow={1} justifyContent={'space-between'} sx={{ padding: '8px 12px' }}>
            <Stack>
              <MemoContent content={item.content} />
            </Stack>
            <Stack sx={{ textAlign: 'end' }}>
              <MemoDate date={'2025.3.20 오후 4:30'} />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column" justifyContent={'space-around'}>
          <IconButton aria-label="edit" onClick={onClickEditButton}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}
