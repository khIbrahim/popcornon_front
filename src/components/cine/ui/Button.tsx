import React from "react";
import { Loader2 } from "lucide-react";
import classNames from "../../../utils/utils.ts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "outline" | "destructive";
    isLoading?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    className,
    isLoading = false,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
    const variants: Record<string, string> = {
        primary:
            "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm hover:shadow-red-500/30",
        ghost:
            "bg-transparent text-slate-200 hover:bg-slate-800 border border-transparent",
        outline:
            "bg-transparent text-slate-200 border border-slate-700 hover:bg-slate-800",
        destructive:
            "bg-red-900/70 text-red-50 border border-red-800 hover:bg-red-800 focus-visible:ring-red-600",
    };

    return (
        <button
            className={classNames(
                base,
                variants[variant],
                "px-3 py-2",
                isLoading && "pointer-events-none opacity-70",
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {children}
        </button>
    );
};

export default Button;