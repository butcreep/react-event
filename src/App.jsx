import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AppLayout from "components/AppLayout";

import Login from "./pages/Login";
import Join from "./pages/Join";
import QuestPost from "./pages/QuestPost";
import JoinForm from "components/JoinForm";
import Agreement from "components/CheckForm";
import LawyerInfo from "pages/Join/lawyerInfo";
import SignUpForm from "pages/SignUpForm";
import Header from "components/Header";
import QuestPage from "pages/QuestPage";
import FindUserId from "pages/FindUserId";
import DetailPage from "pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<Login admin={true} />} />

          <Route path="/join" element={<Join />} />
          <Route path="/agree" element={<Agreement />} />
          <Route path="/lawInfo" element={<LawyerInfo />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/join/:type" element={<JoinForm />} />
          <Route path="/mail/quest" element={<QuestPost />} />
          <Route path="/find_id" element={<FindUserId />} />
          <Route path="/" element={<LayoutWithHeader />}>
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/board" element={<QuestPage />} />
            <Route path="/board/:type" element={<QuestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default App;
