import { Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Layout from "../layouts/Layout";
import Header from "../components/Header";

export default function Router() {

  return (
    <Routes>
      <Route path="/" element={<Layout header={<Header title={'메모 목록'} />} body={<List />} />} />
    </Routes>
  );
}
