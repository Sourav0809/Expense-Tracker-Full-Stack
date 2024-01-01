import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ExpensePage from "../pages/ExpensePage";
import { useSelector } from "react-redux";

const MyRoutes = () => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/" element={<ExpensePage />} />
          <Route path="/auth" element={<ExpensePage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="*" element={<ExpensePage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/expenses" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;
