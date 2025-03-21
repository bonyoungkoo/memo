import { useCallback, useState } from "react";

import { Box, Button, Container, Drawer, Fab, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import useMemoStore from '../stores/memo';
import MemoItem from "../components/MemoItem";

enum ModalType {
  ADD = 'add',
  EDIT = 'edit',
  DETAIL = 'detail'
}

export default function List() {
  const memoList = useMemoStore(state => state.memoList);
  const {add, remove} = useMemoStore(state => state.actions);
  // const { bookmarkList  } = useMemoStore(state => state.bookmarkList);
  // const { setMemoList, deleteMemo, updateMemo  } = useMemoStore(state => state.actions);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<ModalType>(ModalType.EDIT);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClickEditButton = () => {
    setType(ModalType.EDIT)
    handleOpen()
    add({title: '제목1', content: '내용1'})
    add({title: '제목2', content: '내용2'})
    add({title: '제목3', content: '내용3'})
    remove(1);
  }

  const handleClickAddButton = () => {
    setType(ModalType.ADD)
    handleOpen()
    console.log(memoList)
  }

  const handleClickRegisterButton = useCallback(() => {
    add({ title: title, content: content })
  }, [title, content, add])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingBottom: '16px' }}>
        {
          memoList.map((memo, i) => {
            return (
              <Grid key={i} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }} sx={{ height: '100px' }}>
                  <MemoItem item={memo} onClickEditButton={handleClickEditButton} />
              </Grid>
            )
          })
        }
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleClickAddButton}>
        <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: '16px' }}>
          <AddIcon />
        </Fab>
      </Box>

      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ 
          '.MuiPaper-root': { borderRadius: '24px 24px 0 0' }
        }}
      >
        <Box sx={{ height: '90dvh', display: 'flex', alignItems: 'center' }}>
          <Container 
            maxWidth="md" 
            sx={{ 
              height: '100%', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '50px', 
              backgroundColor: '#FFFFFF' 
          }}>
            <Stack gap={3} sx={{ height: '80%' }}>
              <input type="text" placeholder="제목을 입력하세요." onChange={handleInputChange} style={{ borderBottom: '1px solid grey', padding: '12px 0', fontSize: '32px', fontWeight: '700', backgroundColor: '#FFFFFF' }} />
              <textarea placeholder="내용을 2자 이상 입력하세요." onChange={handleTextareaChange} style={{ flexGrow: 1, fontSize: '16px' }}/>
            </Stack>
            <Box>
              <Stack direction="row" justifyContent={'flex-end'}>
                <Stack direction="row" spacing={1}>
                  <Button onClick={handleClickRegisterButton} variant="contained" endIcon={<EditIcon />}>
                    등록
                  </Button>
                  <Button onClick={handleClose} variant="contained" endIcon={<CloseIcon />} sx={{ backgroundColor: 'grey' }}>
                    취소
                  </Button>
                </Stack>
                {
                  type === ModalType.EDIT &&
                  <Stack>
                    <Button variant="contained" color="warning" endIcon={<DeleteIcon />}>
                      삭제
                    </Button>
                  </Stack>
                }
              </Stack>
            </Box>

          </Container>
        </Box>
      </Drawer>

    </Container>
  )
}
