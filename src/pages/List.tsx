import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  Container,
  Fab,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useCallback, useState } from "react";

import MemoItem from "src/components/memo/MemoItem";
import { ModalType } from "src/components/modal/DialogModal";
import MemoModal, { MemoModalType } from "src/components/modal/MemoModal";
import { useModal } from "src/hooks/useModal";
import useMemoStore, { Memo } from "src/stores/memo";

export default function List() {
  const theme = useTheme();
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
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * 각 메모 항목을 클릭할 때 호출되는 함수로, 선택된 메모의 상세 정보를 모달에 표시하기 위한 상태를 설정합니다.
   *
   * @param {Memo} memo
   *
   * 1. 선택된 메모 객체를 `setMemo`로 상태에 저장
   * 2. `setTitle`을 사용해 메모의 제목을 설정
   * 3. `setContent`로 메모의 내용을 설정
   * 4. 모달 타입을 `MemoModalType.DETAIL`로 설정하여 모달을 상세모드로 표시
   * 5. `setIsMemoModalOpen`을 `true`로 설정하여 모달을 열기
   *
   * @returns {void}
   */
  const handleClickMemo = (memo: Memo) => {
    setMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
    setType(MemoModalType.DETAIL);
    setIsMemoModalOpen(true);
    return;
  };

  /**
   * 각 메모 항목의 수정 아이콘을 클릭할 때 호출되는 함수로, 선택된 메모의 수정 정보를 모달에 표시하기 위한 상태를 설정합니다.
   *
   * @param {Memo} memo
   *
   * 1. 선택된 메모 객체를 `setMemo`로 상태에 저장
   * 2. `setTitle`을 사용해 메모의 제목을 설정
   * 3. `setContent`로 메모의 내용을 설정
   * 4. 모달 타입을 `MemoModalType.DETAIL`로 설정하여 모달을 수정모드로 표시
   * 5. `setIsMemoModalOpen`을 `true`로 설정하여 모달을 열기
   *
   * @returns {void}
   */
  const handleClickUpdateIcon = (memo: Memo) => {
    setMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
    setType(MemoModalType.UPDATE);
    setIsMemoModalOpen(true);
    return;
  };

  /**
   * 각 메모 항목의 삭제 아이콘을 클릭할 때 호출되는 함수로, 메모 삭제 확인 모달을 띄우고 삭제를 수행합니다.
   *
   * @param {Memo} memo
   *
   * 1. 선택된 메모 객체를 `setMemo`로 상태에 저장
   * 2. `openModal`을 호출하여 확인 모달을 열고, 삭제 여부를 묻는 메시지를 표시
   *    - `ModalType.CONFIRM` 타입으로 모달을 열고, `contentText`로 삭제 메시지를 설정
   *    - `cancleText`는 취소 버튼 텍스트, `confirmText`는 삭제 버튼 텍스트로 설정
   *    - 취소 버튼 클릭 시 `closeModal()` 호출로 모달을 닫음
   *    - 삭제 버튼 클릭 시 `remove(memo.id)`로 메모 삭제 수행 후 모달을 닫고
   *      삭제 완료 메시지를 `setSnackbarMessage`로 설정하여 스낵바를 표시
   * 3. `setIsSnackbarOpen(true)`로 스낵바를 열어 사용자에게 메모 삭제 완료 메시지를 표시
   *
   * @returns {void}
   */
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

  /**
   * 추가 버튼을 클릭할 때 호출되는 함수로, 새 메모를 추가하기 위한 상태를 초기화하고 모달을 엽니다.
   *
   * 1. `setMemo(undefined)`로 메모 상태를 초기화
   * 2. `setTitle("")`로 제목 상태를 빈 문자열로 초기화
   * 3. `setContent("")`로 내용 상태를 빈 문자열로 초기화
   * 4. 모달 타입을 `MemoModalType.ADD`로 설정하여 모달을 추가모드로 표시
   * 5. `setIsMemoModalOpen(true)`로 메모 추가 모달을 열기
   *
   * @returns {void}
   */
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

  /**
   * 메모의 제목과 내용이 유효한지 검사하는 함수입니다.
   *
   * 1. 제목이 비어 있으면, 경고 모달을 띄우고 "제목을 입력해주세요." 메시지를 표시
   *    - 제목이 입력되지 않은 경우 `false`를 반환하여 유효하지 않음을 알림
   * 2. 내용이 2자 미만일 경우, 경고 모달을 띄우고 "내용을 2자 이상 입력해주세요." 메시지를 표시
   *    - 내용이 너무 짧으면 `false`를 반환하여 유효하지 않음을 알림
   * 3. 제목과 내용이 모두 유효하면 `true`를 반환하여 메모가 유효하다고 판단
   *
   * @returns {boolean} 제목과 내용이 유효하면 `true`, 그렇지 않으면 `false`
   */
  const isValidMemo = useCallback(() => {
    if (!title) {
      openModal({
        type: ModalType.ALERT,
        contentText: "제목을 입력해주세요.",
        confirmText: "확인",
        onClickConfirm: () => closeModal(),
      });
      return false;
    }
    if (content.length < 2) {
      openModal({
        type: ModalType.ALERT,
        contentText: "내용을 2자 이상 입력해주세요.",
        confirmText: "확인",
        onClickConfirm: () => closeModal(),
      });
      return false;
    }
    return true;
  }, [title, content, openModal, closeModal]);

  /**
   * 등록 버튼을 클릭할 때 호출되는 함수로, 메모를 추가, 수정하거나 상세보기 모드에서 처리합니다.
   *
   * 1. `MemoModalType.ADD`일 경우:
   *    - 메모의 제목과 내용이 유효한지 `isValidMemo`로 검증
   *    - 유효하지 않으면 `isValidMemo` 의 경고 모달을 띄우고 함수 종료
   *    - 유효하면 새로운 메모를 `add` 함수로 추가하고, 메모 리스트의 첫번째 ID에 1을 더한 ID를 할당.
   *    - 제목과 내용을 초기화하고, 모달을 닫고, 메모 추가 완료 메시지를 스낵바로 표시.
   *
   * 2. `MemoModalType.UPDATE`일 경우:
   *    - 메모의 제목과 내용이 유효한지 `isValidMemo`로 검증
   *    - 유효하지 않으면 `isValidMemo` 의 경고 모달을 띄우고 함수 종료
   *    - 제목과 내용이 변경되지 않았다면 경고 모달을 띄우고, 수정할 내용을 입력하라고 안내
   *    - 변경이 있다면 `update` 함수로 수정된 메모를 업데이트하고, 수정 완료 메시지를 스낵바로 표시
   *
   * @returns {void}
   */
  const handleClickRegisterButton = useCallback(() => {
    if (type === MemoModalType.ADD) {
      if (!isValidMemo()) {
        return;
      }
      add({
        id: memoList.length ? memoList[0].id + 1 : 0,
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

  /**
   * 제목 Input 의 값이 변경될 때 호출되는 함수로, 입력/변경된 값을 제목 상태에 반영합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 메모 입력 시 Input 변경 이벤트
   *
   * Input 입력 값이 변경되면 해당 값을 `setTitle`을 사용하여 제목 상태에 저장
   *
   * @returns {void}
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    return;
  };

  /**
   * 내용 Textarea 의 값이 변경될 때 호출되는 함수로, 입력/변경된 값을 내용 상태에 반영합니다.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - 메모 입력 시 Textarea 변경 이벤트
   *
   * Textarea 입력 값이 변경되면 해당 값을 `setContent`을 사용하여 내용 상태에 저장
   *
   * @returns {void}
   */
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    return;
  };

  /**
   * 현재 날짜와 시간을 `YYYY.MM.DD HH:MM` 형식으로 반환하는 함수입니다.
   *
   * 1. 현재 날짜와 시간을 `Date` 객체를 사용하여 가져옴
   * 2. 연도, 월, 일, 시간, 분을 각각 추출하고, 시간과 분은 2자리 숫자 형식으로 반환되도록 `padStart`를 사용하여 포맷팅
   *
   * @returns {string} 현재 날짜와 시간을 `YYYY.MM.DD HH:MM` 형식의 문자열로 반환
   */
  const getCreatedAt = () => {
    const now = new Date();
    return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  /**
   * 현재 모달의 타입에 따라 버튼들을 렌더링하는 함수입니다.
   *
   * - `MemoModalType.ADD`일 경우:
   *   - "취소" 버튼과 "등록" 버튼을 렌더링
   *
   * - `MemoModalType.UPDATE`일 경우:
   *   - "취소" 버튼, "수정" 버튼, "삭제" 버튼을 렌더링
   *
   * - `MemoModalType.DETAIL`일 경우:
   *   - "삭제" 버튼만 렌더링
   *
   * - 그 외의 경우:
   *   - "확인" 버튼을 렌더링
   *
   * 각 버튼은 클릭 시 해당하는 콜백 함수가 실행됩니다:
   * - `handleClickCloseButton`: 모달을 닫는 함수
   * - `handleClickRegisterButton`: 메모 등록 또는 수정하는 함수
   * - `handleClickDeleteButton`: 메모를 삭제하는 함수
   *
   * @returns {ReactNode}
   */
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
      <Grid container spacing={2} sx={{ paddingBottom: "64px" }}>
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
          sx={{
            position: "absolute",
            bottom: "16px",
            right: `${isDesktop ? "48px" : isTablet ? "36px" : isMobile ? "16px" : "16px"}`,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <MemoModal
        open={isMemoModalOpen}
        onClose={handleClickCloseButton}
        onClickCloseButton={handleClickCloseButton}
        type={type}
        memo={memo}
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
