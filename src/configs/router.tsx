import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import Verify from "../pages/Authentication/Verify";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import ChangePassword from "../pages/Authentication/ChangePassword";
import CompleteProfile from "../pages/Profile/CompleteProfile";


const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        // path: "/",
        children: [
            {
                path: "/login",
                element: <Login />,
                errorElement: <Login />,
            },
            {
                path: "register",
                element: <Register />,
                errorElement: <Register />,
            },
            {
                path: "verify/:phoneNumber",
                element: <Verify />,
                errorElement: <Verify />,
            },
            {
                path: "forget-password",
                element: <ForgetPassword />,
                errorElement: <ForgetPassword />,
            },
            {
                path: "change-password",
                element: <ChangePassword />,
                errorElement: <ChangePassword />,
            },
        ],
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Home />,
            },
            {
                path: "complete-profile",
                element: <CompleteProfile />,
                errorElement: <CompleteProfile />,
            },
        ],
    },
])

export default router