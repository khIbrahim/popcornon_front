// import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import store from "./store";
import { NotificationProvider } from "./context/NotificationContext.tsx";
import NotificationsContainer from "./components/ui/NotificationsContainer.tsx";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <NotificationProvider>
                <RouterProvider router={router} />
                <NotificationsContainer />
            </NotificationProvider>
        </Provider>
    </QueryClientProvider>
    // </React.StrictMode>
);
