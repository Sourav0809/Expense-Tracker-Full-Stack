import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ExpensePage from "../pages/ExpensePage";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/expenses" element={<ExpensePage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};

export default MyRoutes;
