import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Join from "./pages/Join";
import JoinForm from "components/JoinForm";
import Agreement from "components/CheckForm";
import LawyerInfo from "pages/Join/lawyerInfo";
import SignUpForm from "pages/SignUpForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<Login admin={true} />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/join" element={<Join />} />
        <Route path="/agree" element={<Agreement />} />
        <Route path="/lawInfo" element={<LawyerInfo />} />

        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/join/:type" element={<JoinForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
