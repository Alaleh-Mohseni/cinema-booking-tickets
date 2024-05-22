import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import Verify from "../pages/Authentication/Verify";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
<<<<<<< HEAD
import LoginPassword from "../pages/Authentication/LoginPassword";
import CompleteProfile from "../pages/Profile/CompleteProfile";
import SetPassword from "../pages/Profile/SetPassword";
import ChangePassword from "../pages/Profile/ChangePassword";
// import CompleteProfile from "../pages/Profile/CompleteProfile/profile";
// import UpdateProfileForm from "../pages/Profile/CompleteProfile/complete";
=======
import ChangePassword from "../pages/Authentication/ChangePassword";
import CompleteProfile from "../pages/Profile/CompleteProfile";

>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a

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
        ],
    },
<<<<<<< HEAD
=======
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
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
])

export default router