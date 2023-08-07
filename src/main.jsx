import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main.jsx";
import AuthProviders from "./AuthProviders/AuthProviders";
import Login from "./Authenticate/Login.jsx/Login";
import Register from "./Authenticate/Register/Register";
import Home from "./Home/Home";
import Dashboard from "./Layout/Dashboard";
import ManageUsers from "./Admin/ManageUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddAClass from "./Instructor/AddAClass";
import ManageClasses from "./Admin/ManageClasses";
import Feedback from "./Admin/Feedback";
import MyClass from "./Instructor/MyClass";
import Classes from "./Classes/Classes";
import SelectedClass from "./User/SelectedClass";
import Payment from "./User/Payment/Payment";
import EnrolledClass from "./User/EnrolledClass";
import PaymentHistory from "./User/PaymentHistory";
import Instructor from "./SharedPages/Instructor/Instructor";
import ErrorPage from "./SharedPages/ErrorPage/ErrorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/signUp",
                element: <Register></Register>,
            },
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/classes",
                element: <Classes></Classes>,
                loader: () =>
                    fetch(
                        "https://language-master-server-omega.vercel.app/admin"
                    ),
            },
            {
                path: "/instructor",
                element: <Instructor></Instructor>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "manageUser",
                element: <ManageUsers></ManageUsers>,
            },
            {
                path: "addAClass",
                element: <AddAClass></AddAClass>,
            },
            {
                path: "manageClass",
                element: <ManageClasses></ManageClasses>,
            },
            {
                path: "feedback/:id",
                element: <Feedback></Feedback>,
            },
            {
                path: "myClass",
                element: <MyClass></MyClass>,
            },
            {
                path: "selectClass",
                element: <SelectedClass></SelectedClass>,
            },
            {
                path: "payment",
                element: <Payment></Payment>,
            },
            {
                path: "enrollClass",
                element: <EnrolledClass></EnrolledClass>,
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProviders>
                <RouterProvider router={router} />
            </AuthProviders>
        </QueryClientProvider>
    </React.StrictMode>
);
