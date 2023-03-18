import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useUsersStore from "./features/users/useUsersStore";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "./views/ErrorPage";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Signin from "./views/Signin";
import ViewPost from "./views/ViewPost";
function App() {
  const isLoading = useUsersStore((state) => state.isLoading);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="post/:id" element={<ViewPost />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
