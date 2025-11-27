// import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext";
import {NotificationProvider} from "./context/NotificationContext.tsx";
import NotificationsContainer from "./components/ui/NotificationsContainer.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <NotificationProvider>
                <RouterProvider router={router} />
                <NotificationsContainer/>
            </NotificationProvider>
        </AuthProvider>
    </QueryClientProvider>
  // </React.StrictMode>
);

