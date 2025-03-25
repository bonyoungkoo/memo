import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, Button, Container, Fab, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useCallback, useState } from "react";

import MemoItem from "src/components/memo/MemoItem";
import { ModalType } from "src/components/modal/DialogModal";
import MemoModal, { MemoModalType } from "src/components/modal/MemoModal";
import { useModal } from "src/hooks/useModal";
import useMemoStore, { Memo } from "src/stores/memo";

export default function List() {
  const memoList = useMemoStore((state) => state.memoList);
  const { add, update, remove } = useMemoStore((state) => state.actions);

  const [memo, setMemo] = useState<Memo>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<MemoModalType>(MemoModalType.ADD);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const { openModal, closeModal } = useModal();

  /**
   *
   * @param memo
   * @returns
   */
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
        setSnackbarMessage("메모가 삭제되었습니다.");
        setIsSnackbarOpen(true);
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

  const handleClickCloseButton = useCallback(() => {
    if (type === MemoModalType.DETAIL) {
      setIsMemoModalOpen(false);
      return;
    }
    if (type === MemoModalType.ADD) {
      if (title || content) {
        openModal({
          type: ModalType.CONFIRM,
          contentText:
            "작성 중인 내용이 있습니다.\n저장하지 않고 닫으시겠습니까?",
          cancleText: "취소",
          confirmText: "확인",
          onClickCancle: () => closeModal(),
          onClickConfirm: () => {
            setIsMemoModalOpen(false);
            closeModal();
          },
        });
        return;
      } else {
        setIsMemoModalOpen(false);
        return;
      }
    }
    if (type === MemoModalType.UPDATE) {
      if (memo?.title !== title || memo?.content !== content) {
        openModal({
          type: ModalType.CONFIRM,
          contentText:
            "수정 중인 내용이 있습니다.\n변경 사항을 저장하지 않고 닫으시겠습니까?",
          cancleText: "취소",
          confirmText: "확인",
          onClickCancle: () => closeModal(),
          onClickConfirm: () => {
            setIsMemoModalOpen(false);
            closeModal();
          },
        });
        return;
      } else {
        setIsMemoModalOpen(false);
        return;
      }
    }
  }, [closeModal, content, memo, openModal, title, type]);

  const handleClickDeleteButton = useCallback(() => {
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
        setIsMemoModalOpen(false);
        setSnackbarMessage("메모가 삭제되었습니다.");
        setIsSnackbarOpen(true);
      },
    });
    return;
  }, [closeModal, memo, openModal, remove]);

  const isValidMemo = useCallback(() => {
    if (!title) {
      openModal({
        type: ModalType.ALERT,
        contentText: "제목을 입력하세요.",
        confirmText: "확인",
        onClickConfirm: () => closeModal(),
      });
      return false;
    }
    if (content.length < 2) {
      openModal({
        type: ModalType.ALERT,
        contentText: "내용을 2자 이상 입력하세요.",
        confirmText: "확인",
        onClickConfirm: () => closeModal(),
      });
      return false;
    }
    return true;
  }, [title, content, openModal, closeModal]);

  const handleClickRegisterButton = useCallback(() => {
    if (type === MemoModalType.ADD) {
      if (!isValidMemo()) {
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
      setSnackbarMessage("메모가 추가되었습니다.");
      setIsSnackbarOpen(true);
      return;
    }
    if (type === MemoModalType.UPDATE) {
      if (!isValidMemo()) {
        return;
      }
      if (memo?.title === title && memo?.content === content) {
        openModal({
          type: ModalType.ALERT,
          contentText: "메모가 이전과 동일합니다.\n수정할 내용을 입력해주세요.",
          onClickConfirm: () => closeModal(),
        });
        return;
      }
      update({
        id: memo!.id,
        title: title,
        content: content,
        createdAt: getCreatedAt(),
      });
      setIsMemoModalOpen(false);
      setSnackbarMessage("메모가 수정되었습니다.");
      setIsSnackbarOpen(true);
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
      setIsSnackbarOpen(true);
      return;
    }
  }, [
    type,
    isValidMemo,
    add,
    memoList,
    title,
    content,
    memo,
    update,
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

  const renderButtons = useCallback(() => {
    switch (type) {
      case MemoModalType.ADD:
        return (
          <>
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
          </>
        );
      case MemoModalType.UPDATE:
        return (
          <>
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
              수정
            </Button>
            <Button
              onClick={handleClickDeleteButton}
              variant="contained"
              color="warning"
              endIcon={<DeleteIcon />}
            >
              삭제
            </Button>
          </>
        );
      case MemoModalType.DETAIL:
        return (
          <Button
            onClick={handleClickDeleteButton}
            variant="contained"
            color="warning"
            endIcon={<DeleteIcon />}
          >
            삭제
          </Button>
        );
      default:
        return (
          <Button
            onClick={handleClickCloseButton}
            variant="contained"
            endIcon={<CloseIcon />}
            sx={{ backgroundColor: "grey" }}
          >
            확인
          </Button>
        );
    }
  }, [
    type,
    handleClickCloseButton,
    handleClickDeleteButton,
    handleClickRegisterButton,
  ]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingBottom: "56px" }}>
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
          sx={{ position: "absolute", bottom: "16px", right: "16px" }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <MemoModal
        open={isMemoModalOpen}
        onClose={handleClickCloseButton}
        onClickCloseButton={handleClickCloseButton}
        type={type}
        defaultTitle={memo?.title || ""}
        defaultContent={memo?.content || ""}
        onChangeInputTitle={handleInputChange}
        onChangeTextareaContent={handleTextareaChange}
        renderButtons={renderButtons}
      />

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
