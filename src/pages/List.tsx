import { useCallback, useState } from "react";
import { Box, Button, Container, Drawer, Fab, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MemoItem from "src/components/MemoItem";
import useMemoStore, { Memo } from "src/stores/memo";
import { useModal } from "src/components/hooks/useModal";
import { ModalType } from "src/components/Modal";

enum MemoModalType {
  ADD = "add",
  UPDATE = "update",
  DETAIL = "detail",
}

export default function List() {
  const memoList = useMemoStore((state) => state.memoList);
  const { add, update, remove } = useMemoStore((state) => state.actions);

  const [memo, setMemo] = useState<Memo>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<MemoModalType>(MemoModalType.ADD);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const { openModal, closeModal } = useModal();

  const handleClickMemo = (memo: Memo) => {
    setMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
    setType(MemoModalType.DETAIL);
    setIsMemoModalOpen(true);
    return;
  };

  const handleClickUpdateIcon = (memo: Memo) => {
    setMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
    setType(MemoModalType.UPDATE);
    setIsMemoModalOpen(true);
    return;
  };

  const handleClickDeleteIcon = (memo: Memo) => {
    setMemo(memo);
    openModal({
      type: ModalType.CONFIRM,
      contentText: "해당 메모를 삭제하시겠습니까?",
      cancleText: "취소",
      confirmText: "삭제",
      onClickCancle: () => closeModal(),
      onClickConfirm: () => {
        remove(memo.id);
        closeModal();
      },
    });
    return;
  };

  const handleClickAddButton = () => {
    setMemo(undefined);
    setTitle("");
    setContent("");
    setType(MemoModalType.ADD);
    setIsMemoModalOpen(true);
    return;
  };

  const handleClickCloseButton = () => {
    openModal({
      type: ModalType.CONFIRM,
      contentText: "메모 작성을 취소하시겠습니까?",
      cancleText: "취소",
      confirmText: "확인",
      onClickCancle: () => closeModal(),
      onClickConfirm: () => {
        setIsMemoModalOpen(false);
        closeModal();
      },
    });
    return;
  };

  const handleClickDeleteButton = () => {
    setMemo(memo);
    openModal({
      type: ModalType.CONFIRM,
      contentText: "해당 메모를 삭제하시겠습니까?",
      cancleText: "취소",
      confirmText: "삭제",
      onClickCancle: () => closeModal(),
      onClickConfirm: () => {
        remove(memo!.id);
        closeModal();
      },
    });
    return;
  };

  const handleClickRegisterButton = useCallback(() => {
    if (type === MemoModalType.ADD) {
      if (!title) {
        openModal({
          type: ModalType.ALERT,
          contentText: "제목을 입력하세요.",
          confirmText: "확인",
          onClickCancle: () => closeModal(),
          onClickConfirm: () => {
            remove(memo!.id);
            closeModal();
          },
        });
        return;
      }
      if (content.length < 2) {
        openModal({
          type: ModalType.ALERT,
          contentText: "내용을 2자 이상 입력하세요.",
          confirmText: "확인",
          onClickCancle: () => closeModal(),
          onClickConfirm: () => {
            remove(memo!.id);
            closeModal();
          },
        });
        return;
      }
      add({
        id: memoList.length ? memoList[memoList.length - 1].id + 1 : 0,
        title: title,
        content: content,
        createdAt: getCreatedAt(),
      });
      setTitle("");
      setContent("");
      setIsMemoModalOpen(false);
      return;
    }
    if (type === MemoModalType.UPDATE) {
      update({
        id: memo!.id,
        title: title,
        content: content,
        createdAt: getCreatedAt(),
      });
      setIsMemoModalOpen(false);
      return;
    }
    if (type === MemoModalType.DETAIL) {
      update({
        id: memo!.id,
        title: title,
        content: content,
        createdAt: getCreatedAt(),
      });
      setIsMemoModalOpen(false);
      return;
    }
  }, [
    type,
    memoList,
    memo,
    title,
    content,
    add,
    update,
    remove,
    openModal,
    closeModal,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    return;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    return;
  };

  const getCreatedAt = () => {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingBottom: "16px" }}>
        {memoList.map((memo, i) => {
          return (
            <Grid
              key={i}
              size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}
              sx={{ height: "100px" }}
            >
              <MemoItem
                item={memo}
                onClickMemo={handleClickMemo}
                onClickUpdate={handleClickUpdateIcon}
                onClickDelete={handleClickDeleteIcon}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end" }}
        onClick={handleClickAddButton}
      >
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", bottom: "16px" }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Drawer
        aria-hidden={false}
        anchor={"bottom"}
        open={isMemoModalOpen}
        sx={{
          ".MuiPaper-root": { borderRadius: "24px 24px 0 0" },
        }}
      >
        <Box sx={{ height: "90dvh", display: "flex", alignItems: "center" }}>
          <Container
            maxWidth="md"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
              borderRadius: "50px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Stack gap={3} sx={{ height: "80%" }}>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                defaultValue={memo && memo.title}
                onChange={handleInputChange}
                style={{
                  borderBottom: "1px solid grey",
                  padding: "12px 0",
                  fontSize: "32px",
                  fontWeight: "700",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <textarea
                placeholder="내용을 2자 이상 입력하세요."
                defaultValue={memo && memo.content}
                onChange={handleTextareaChange}
                style={{ flexGrow: 1, fontSize: "16px" }}
              />
            </Stack>
            <Box>
              <Stack direction="row" justifyContent={"flex-end"}>
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={handleClickCloseButton}
                    variant="contained"
                    endIcon={<CloseIcon />}
                    sx={{ backgroundColor: "grey" }}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleClickRegisterButton}
                    variant="contained"
                    endIcon={<EditIcon />}
                  >
                    등록
                  </Button>
                  {type !== MemoModalType.ADD && (
                    <Button
                      onClick={handleClickDeleteButton}
                      variant="contained"
                      color="warning"
                      endIcon={<DeleteIcon />}
                    >
                      삭제
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Drawer>
    </Container>
  );
}
