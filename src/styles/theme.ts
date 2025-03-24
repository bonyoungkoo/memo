import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Pretendard",
    h1: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "16px",
      fontWeight: 500,
      padding: 0,
      margin: 0,
    },
    body1: {
      fontSize: "12px",
      fontWeight: 300,
      margin: 0,
    },
    subtitle1: {
      fontSize: "12px",
      margin: 0,
      padding: 0,
    },
  },
});

export default theme;
