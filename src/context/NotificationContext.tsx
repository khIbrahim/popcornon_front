import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

type NotificationVariant = "success" | "error" | "info";

interface Notification {
    id: string;
    title: string;
    message?: string;
    variant: NotificationVariant;
}

interface NotificationContextValue {
    notifications: Notification[];
    notify: (n: Omit<Notification, "id">) => void;
    notifySuccess: (title: string, message?: string) => void;
    notifyError: (title: string, message?: string) => void;
    remove: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
    undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const remove = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const notify = useCallback((n: Omit<Notification, "id">) => {
        const id = crypto.randomUUID();
        const newNotif: Notification = { id, ...n };

        setNotifications((prev) => [newNotif, ...prev]);

        setTimeout(() => {
            remove(id);
        }, 5000);
    }, [remove]);

    const notifySuccess = useCallback(
        (title: string, message?: string) =>
            notify({ title, message, variant: "success" }),
        [notify]
    );

    const notifyError = useCallback(
        (title: string, message?: string) =>
            notify({ title, message, variant: "error" }),
        [notify]
    );

    return (
        <NotificationContext.Provider
            value={{ notifications, notify, notifySuccess, notifyError, remove }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return ctx;
}
