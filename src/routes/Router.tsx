import { Route, Routes } from "react-router-dom";

import Header from "src/layouts/Header";
import Layout from "src/layouts/Layout";
import List from "src/pages/List";

/**
 * 페이지 라우터
 *
 * `Routes`와 `Route`를 사용하여 페이지를 라우팅합니다.
 * 현재는 단 하나의 경로(`/`)만 정의되어 있으며, 이 경로에서 `Layout` 컴포넌트로 감싼 페이지 컴포넌트(body)가 렌더링됩니다.
 * `Layout` 컴포넌트에는 `Header`와 `List` 컴포넌트가 각각 `header`와 `body`로 전달됩니다.
 *
 * 현재 프로젝트에서는 하나의 라우트만 처리하고 있어, 라우팅이 필요하지 않을 수도 있으나
 * 향후 다른 페이지를 추가할 때를 감안하여 페이지 라우터를 작성하였습니다.
 *
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
