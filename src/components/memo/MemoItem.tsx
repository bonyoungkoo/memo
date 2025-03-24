import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton, Paper, Stack } from "@mui/material";

import MemoContent from "src/components/memo/MemoContent";
import MemoDate from "src/components/memo/MemoDate";
import MemoTitle from "src/components/memo/MemoTitle";
import { Memo } from "src/stores/memo";

/**
 * MemoItem
 * @param item 메모 객체
 * @param onClickMemo 메모 컴포넌트 클릭 콜백함수
 * @param onClickUpdate 수정버튼 클릭 콜백함수
 * @param onClickDelete 삭제버튼 클릭 콜백함수
 * @returns ReactNode
 */
export default function MemoItem({
  item,
  onClickMemo,
  onClickUpdate,
  onClickDelete,
}: {
  item: Memo;
  onClickMemo: (item: Memo) => void;
  onClickUpdate: (item: Memo) => void;
  onClickDelete: (item: Memo) => void;
}) {
  return (
    <Paper
      sx={{
        height: "100px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      variant="outlined"
    >
      <Stack direction="row" sx={{ height: "150px", width: "100%" }}>
        <Stack
          sx={{
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            width: "90%",
            cursor: "pointer",
          }}
          onClick={() => onClickMemo(item)}
        >
          <Stack
            sx={{ height: "60%", padding: "12px", backgroundColor: "#F8F8F7" }}
          >
            <MemoTitle title={item.title} />
          </Stack>
          <Divider />
          <Stack
            direction={"column"}
            flexGrow={1}
            justifyContent={"space-between"}
            sx={{ padding: "8px 12px" }}
          >
            <Stack>
              <MemoContent content={item.content} />
            </Stack>
            <Stack sx={{ textAlign: "end" }}>
              <MemoDate date={item.createdAt} />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column" justifyContent={"space-around"} flexGrow={1}>
          <IconButton aria-label="edit" onClick={() => onClickUpdate(item)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onClickDelete(item)}>
            <DeleteIcon aria-label="delete" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
