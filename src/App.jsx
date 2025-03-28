import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar/nav";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appright/auth";
import service from "./appright/conf";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.userData);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
