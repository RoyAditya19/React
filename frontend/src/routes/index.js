import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import Adminpanel from "../pages/Adminpanel";
import Allusers from "../pages/Allusers";
import Allproducts from "../pages/Allproducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

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
                path: "product-category",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "search",
                element: <SearchProduct/>
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