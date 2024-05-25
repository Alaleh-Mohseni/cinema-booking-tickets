import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import Verify from "../pages/Authentication/Verify";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import LoginPassword from "../pages/Authentication/LoginPassword";
import CompleteProfile from "../pages/Profile/CompleteProfile";
import SetPassword from "../pages/Profile/SetPassword";
import ChangePassword from "../pages/Profile/ChangePassword";


const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {
                path: "login",
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
                path: "login-password/:phoneNumber",
                element: <LoginPassword />,
                errorElement: <LoginPassword />,
            },
            {
                path: "forget-password",
                element: <ForgetPassword />,
                errorElement: <ForgetPassword />,
            }
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
                path: "dashboard",
                element: <DashboardLayout />,
                errorElement: <DashboardLayout />,
                children: [
                    {
                        path: "complete-profile",
                        element: <CompleteProfile />,
                        errorElement: <CompleteProfile />,
                    },
                    {
                        path: "set-password",
                        element: <SetPassword />,
                        errorElement: <SetPassword />,
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                        errorElement: <ChangePassword />,
                    },        
                ]
            },
        ],
    },
])

export default router