import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

/**
 * 모달타입 enum
 * ALERT = 단일 버튼 알럿 모달
 * CONFIRM = 취소/확인 버튼 컨펌 모달
 */
export enum ModalType {
  ALERT = "alert",
  CONFIRM = "confirm",
}

export interface ModalProps {
  type: ModalType;
  contentText: string;
  cancleText?: string;
  confirmText?: string;
  onClickCancle?: () => void;
  onClickConfirm: () => void;
}

/**
 * 두 가지 타입(취소/확인)의 모달을 제공
 * @param type 모달 타입 ModalType 참고
 * @param contentText 모달에 표시할 내용 텍스트
 * @param cancleText 취소버튼 텍스트
 * @param confirmText 확인버튼 텍스트
 * @param onClickCancle 취소버튼 클릭 시 호출되는 콜백함수
 * @param onClickConfirm 확인버튼 클릭 시 호출되는 콜백함수
 * @returns {ReactNode}
 */
export default function DialogModal({
  type,
  contentText,
  cancleText = "취소",
  confirmText = "확인",
  onClickCancle,
  onClickConfirm,
}: ModalProps) {
  return (
    <Dialog open={true} sx={{}}>
      <DialogContent sx={{ width: "280px" }}>
        <DialogContentText sx={{ fontSize: "16px", whiteSpace: "pre-line" }}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === ModalType.ALERT ? (
          <Button onClick={onClickConfirm} autoFocus>
            {confirmText}
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={onClickCancle}>
              {cancleText}
            </Button>
            <Button onClick={onClickConfirm} autoFocus>
              {confirmText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
