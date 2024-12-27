import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useQuery } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { axiosInstance } from "./lib/axios";
import toast from "react-hot-toast";

export default function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: "authUser",
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });

  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </Layout>
  );
}
