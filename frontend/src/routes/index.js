import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import Adminpanel from "../pages/Adminpanel";
import Allusers from "../pages/Allusers";
import Allproducts from "../pages/Allproducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },
            {
                path: "admin-panel",
                element: <Adminpanel/>,
                children: [
                    {
                        path: "all-users",
                        element: <Allusers/>
                    },
                    {
                        path: "all-products",
                        element: <Allproducts/>
                    }
                ]
            }
        ]
    }
])

export default router;