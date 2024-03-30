import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Page Imports
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserReports from "./Pages/User/UserReports";
import WriteExam from "./Pages/User/WriteExam";
import Exams from "./Pages/Admin/Exams";
import AddEditExam from "./Pages/Admin/AddEditExam";
import AdminReports from "./Pages/Admin/adminReports";
import AdminInterview from "./Pages/Admin/AdminInterview";
import UserInterview from "./Pages/User/UserInterview";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/reports",
    element: (
      <ProtectedRoute>
        <UserReports />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/write-exam/:id",
    element: (
      <ProtectedRoute>
        <WriteExam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/interview",
    element: (
      <ProtectedRoute>
        <UserInterview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/exams",
    element: (
      <ProtectedRoute>
        <Exams />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/exams/add",
    element: (
      <ProtectedRoute>
        <AddEditExam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/exams/edit/:id",
    element: (
      <ProtectedRoute>
        <AddEditExam />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute>
        <AdminReports />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/interview",
    element: (
      <ProtectedRoute>
        <AdminInterview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
