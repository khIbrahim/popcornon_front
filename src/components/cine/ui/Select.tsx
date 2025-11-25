import React from "react";
import classNames from "../../../utils/utils.ts";

const Select = ({
                    className,
                    children,
                    ...props
                }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        className={classNames(
            "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
            className
        )}
        {...props}
    >
        {children}
    </select>
);

export default Select;