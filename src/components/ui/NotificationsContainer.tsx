import { useNotification } from "../../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NotificationsContainer() {
    const { notifications, remove } = useNotification();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="pointer-events-none fixed top-4 right-4 z-[99999] flex flex-col gap-3 w-full max-w-sm">
            <AnimatePresence initial={false}>
                {notifications.map((notif) => (
                    <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_e, info) => {
                            if (Math.abs(info.offset.x) > 80) remove(notif.id);
                        }}
                        onMouseEnter={() => setHoveredId(notif.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`
                            pointer-events-auto backdrop-blur-xl 
                            rounded-2xl border px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                            flex items-start gap-3 relative transition-colors

                            ${notif.variant === "success" ? "border-emerald-500/30 bg-emerald-950/40" : ""}
                            ${notif.variant === "error"   ? "border-rose-500/30 bg-rose-950/40" : ""}
                            ${notif.variant === "info"    ? "border-sky-500/30 bg-sky-950/40"  : ""}
                        `}
                    >
                        {/* Accent bar */}
                        <div
                            className={`
                                w-1.5 rounded-full my-1
                                ${notif.variant === "success" ? "bg-gradient-to-b from-emerald-400 to-emerald-600" : ""}
                                ${notif.variant === "error"   ? "bg-gradient-to-b from-rose-400 to-rose-600" : ""}
                                ${notif.variant === "info"    ? "bg-gradient-to-b from-sky-400 to-sky-600"  : ""}
                            `}
                        />

                        <div className="flex-1">
                            <p className="font-semibold text-slate-50 tracking-tight">
                                {notif.title}
                            </p>
                            {notif.message && (
                                <p className="text-sm text-slate-300 leading-snug">
                                    {notif.message}
                                </p>
                            )}
                        </div>

                        {/* Close btn */}
                        <button
                            onClick={() => remove(notif.id)}
                            className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Auto-dismiss handling */}
                        {!hoveredId && (
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 4, ease: "linear" }}
                                className="absolute bottom-0 left-0 h-[3px] rounded-full
                                    bg-white/20"
                                onAnimationComplete={() => remove(notif.id)}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
