import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export enum ModalType {
  ALERT = "alert",
  CONFIRM = "confirm",
}

export interface ModalProps {
  type: ModalType;
  contentText: string;
  cancleText?: string;
  confirmText?: string;
  onClose?: () => void;
  onClickCancle?: () => void;
  onClickConfirm: () => void;
}

export default function Modal({
  type,
  contentText,
  cancleText = "취소",
  confirmText = "확인",
  onClose,
  onClickCancle,
  onClickConfirm,
}: ModalProps) {
  return (
    <Dialog open={true} onClose={onClose} sx={{}}>
      <DialogContent sx={{ width: "250px" }}>
        <DialogContentText sx={{ fontSize: "16px" }}>
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
