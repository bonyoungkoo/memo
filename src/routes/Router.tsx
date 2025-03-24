import { Route, Routes } from "react-router-dom";

import Header from "src/layouts/Header";
import Layout from "src/layouts/Layout";
import List from "src/pages/List";

/**
 * 페이지 라우터
 */
export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout header={<Header title={"메모 목록"} />} body={<List />} />
        }
      />
    </Routes>
  );
}
