import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Dialog from '@mui/material/Dialog';

export enum ActionModalType {
  ALERT = 'alert',
  CONFIRM = 'confirm'
}

interface ActionModal {
  open: boolean
  type: string
  contentText: string
  cancleText?: string
  confirmText: string
  onClose: () => void
  onClickCancle: () => void
  onClickConfirm: () => void
}

export default function ActionModal({
  open, 
  type,
  contentText,
  cancleText,
  confirmText,
  onClose, 
  onClickConfirm, 
  onClickCancle
}: ActionModal) {
  return (
    <Dialog
      aria-hidden={false}
      closeAfterTransition={false}
      open={open}
      onClose={onClose}
    >
      <DialogContent sx={{ width: '250px' }}>
        <DialogContentText sx={{ fontSize: '16px' }}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          type === ActionModalType.ALERT ? (
            <Button onClick={onClickConfirm} autoFocus>
              {confirmText ? confirmText : '확인'}
            </Button>
          ) : (
            <>
              <Button color={'inherit'} onClick={onClickCancle}>
                {cancleText ? cancleText : '취소'}
              </Button>
              <Button onClick={onClickConfirm} autoFocus>
                {confirmText ? confirmText : '확인'}
              </Button>
            </>
          )
        }
      </DialogActions>
    </Dialog>
  )
}
