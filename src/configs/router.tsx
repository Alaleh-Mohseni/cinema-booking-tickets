import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import Verify from "../pages/Authentication/Verify";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import ChangePassword from "../pages/Authentication/ChangePassword";

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
                path: "verify",
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
        element: <Home />,
        path: '/',
    }
])

export default router