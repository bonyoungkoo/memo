import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, Drawer, Stack } from "@mui/material";

import { useEffect } from "react";

import { Memo } from "src/stores/memo";

/**
 * 메모 폼 모달 타입
 * ADD 생성
 * UPDATE 수정
 * DETAIL 상세
 */
export enum MemoModalType {
  ADD = "add",
  UPDATE = "update",
  DETAIL = "detail",
}

/**
 * 메모 폼 모달
 * @param open 모달 열림/닫힘
 * @param type 모달 타입 MemoModalType 참고
 * @param memo 메모 데이터
 * @param onClose 모달 닫을 시 콜백함수
 * @param onChangeInputTitle 제목 input 변경 이벤트 콜백함수
 * @param onChangeTextareaContent 내용 textarea 변경 이벤트 콜백함수
 * @param renderButtons 렌더할 버튼 컴포넌트
 * @returns {ReactNode}
 */
export default function MemoModal({
  open,
  type,
  memo,
  onClose,
  onClickCloseButton,
  onChangeInputTitle,
  onChangeTextareaContent,
  renderButtons,
}: {
  open: boolean;
  type: MemoModalType;
  onClose?: () => void;
  onClickCloseButton: () => void;
  memo: Memo | undefined;
  onChangeInputTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextareaContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  renderButtons: () => React.ReactNode;
}) {
  useEffect(() => {
    console.log(memo);
  }, []);
  return (
    <Drawer
      aria-hidden={false}
      anchor={"bottom"}
      open={open}
      onClose={onClose}
      sx={{
        ".MuiPaper-root": { borderRadius: "24px 24px 0 0" },
      }}
    >
      <Box sx={{ height: "90dvh", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            cursor: "pointer",
          }}
          onClick={onClickCloseButton}
        >
          <CloseIcon />
        </Box>
        <Container
          maxWidth="md"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "36px 16px",
            borderRadius: "50px",
            backgroundColor: "#FFFFFF",
          }}
        >
          {type === MemoModalType.DETAIL && (
            <Stack sx={{ textAlign: "center" }}>{memo?.createdAt}</Stack>
          )}
          <Stack gap={3} sx={{ height: "80%" }}>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              defaultValue={memo?.title}
              readOnly={type === MemoModalType.DETAIL ? true : false}
              onChange={onChangeInputTitle}
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
              defaultValue={memo?.content}
              readOnly={type === MemoModalType.DETAIL ? true : false}
              onChange={onChangeTextareaContent}
              style={{ flexGrow: 1, fontSize: "16px" }}
            />
          </Stack>
          <Stack direction="column">
            <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
              {renderButtons()}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Drawer>
  );
}
