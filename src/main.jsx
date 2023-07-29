import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Routers.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="container mx-auto rounded-sm">
             <AuthProviders>
            {" "}
            <RouterProvider router={router}> </RouterProvider>
        </AuthProviders>
        </div>
       
    </React.StrictMode>
);
