import { useCallback, useState } from "react";

import { Box, Button, Container, Drawer, Fab, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import useMemoStore, { Memo } from '../stores/memo';
import MemoItem from "../components/MemoItem";
import ActionModal, { ActionModalType } from "../components/ActionModal";

enum ModalType {
  ADD = 'add',
  UPDATE = 'update',
  DETAIL = 'detail'
}

export default function List() {
  const memoList = useMemoStore(state => state.memoList);
  const {add, update, remove} = useMemoStore(state => state.actions);

  const [memo, setMemo] = useState<Memo>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<ModalType>(ModalType.ADD);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalType, setActionModalType] = useState<ActionModalType>(ActionModalType.ALERT);
  const [contentText, setContentText] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('');

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsMemoModalOpen(newOpen);
  };

  const handleClickMemo = (memo: Memo) => {
    setMemo(memo)
    setTitle(memo.title)
    setContent(memo.content)
    setType(ModalType.DETAIL)
    setIsMemoModalOpen(true)
  }

  const handleClickUpdateIcon = (memo: Memo) => {
    setMemo(memo)
    setTitle(memo.title)
    setContent(memo.content)
    setType(ModalType.UPDATE)
    setIsMemoModalOpen(true)
  }

  const handleClickDeleteIcon = (memo: Memo) => {
    setMemo(memo)
    setActionModalType(ActionModalType.CONFIRM)
    setContentText('해당 메모를 삭제하시겠습니까?')
    setConfirmText('삭제')
    setIsActionModalOpen(true)
  }

  const handleClickAddButton = () => {
    setMemo(undefined)
    setTitle('')
    setContent('')
    setType(ModalType.ADD)
    setIsMemoModalOpen(true)
  }

  const handleClickCloseButton = () => {
    setIsMemoModalOpen(false)
  }

  const handleClickDeleteButton = () => {
    setMemo(memo)
    setActionModalType(ActionModalType.CONFIRM)
    setContentText('해당 메모를 삭제하시겠습니까?')
    setConfirmText('삭제')
    setIsActionModalOpen(true)
  }

  const handleClickRegisterButton = useCallback(() => {
    if (type === ModalType.ADD) {
      if (!title) {
        setActionModalType(ActionModalType.ALERT)
        setContentText('제목을 입력하세요.')
        setConfirmText('확인')
        setIsActionModalOpen(true)
        return
      }
      if (content.length < 2 ) {
        setActionModalType(ActionModalType.ALERT)
        setContentText('내용을 2자 이상 입력하세요.')
        setConfirmText('확인')
        setIsActionModalOpen(true)
        return
      }
      add({ id: memoList.length ? memoList[memoList.length - 1].id + 1 : 0, title: title, content: content, createdAt: getCreatedAt() })
      setTitle('')
      setContent('')
      setIsMemoModalOpen(false)
    } 
    if (type === ModalType.UPDATE) {
      update({ id: memo!.id, title: title, content: content, createdAt: getCreatedAt() }) 
      setIsMemoModalOpen(false)
    }
    if (type === ModalType.DETAIL) {
      update({ id: memo!.id, title: title, content: content, createdAt: getCreatedAt() }) 
      setIsMemoModalOpen(false)
    }
  }, [type, memoList, memo, title, content, add, update])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const getCreatedAt = () => {
    const now = new Date()
    return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingBottom: '16px' }}>
        {
          memoList.map((memo, i) => {
            return (
              <Grid key={i} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }} sx={{ height: '100px' }}>
                  <MemoItem item={memo} onClickMemo={handleClickMemo} onClickUpdate={handleClickUpdateIcon} onClickDelete={handleClickDeleteIcon} />
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
        aria-hidden={false}
        anchor={'bottom'}
        open={isMemoModalOpen}
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
              <input type="text" placeholder="제목을 입력하세요." defaultValue={memo && memo.title} onChange={handleInputChange} style={{ borderBottom: '1px solid grey', padding: '12px 0', fontSize: '32px', fontWeight: '700', backgroundColor: '#FFFFFF' }} />
              <textarea placeholder="내용을 2자 이상 입력하세요." defaultValue={memo && memo.content} onChange={handleTextareaChange} style={{ flexGrow: 1, fontSize: '16px' }}/>
            </Stack>
            <Box>
              <Stack direction="row" justifyContent={'flex-end'}>
                <Stack direction="row" spacing={1}>
                  <Button onClick={handleClickRegisterButton} variant="contained" endIcon={<EditIcon />}>
                    등록
                  </Button>
                  <Button onClick={handleClickCloseButton} variant="contained" endIcon={<CloseIcon />} sx={{ backgroundColor: 'grey' }}>
                    취소
                  </Button>
                  {
                    type !== ModalType.ADD &&
                    <Button onClick={handleClickDeleteButton} variant="contained" color="warning" endIcon={<DeleteIcon />}>
                      삭제
                    </Button>
                  }
                </Stack>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Drawer>
      <ActionModal
        open={isActionModalOpen} 
        type={actionModalType}
        contentText={contentText} 
        confirmText={confirmText} 
        onClose={() => {setIsActionModalOpen(false)}} 
        onClickCancle={() => {setIsActionModalOpen(false)}} 
        onClickConfirm={() => {
          if (actionModalType === ActionModalType.CONFIRM) {
            setIsActionModalOpen(false)
            setIsMemoModalOpen(false)
            remove(memo!.id)
          } else {
            setIsActionModalOpen(false)
          }
        }}
      />

    </Container>
  )
}
