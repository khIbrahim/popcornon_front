import React from "react";

import classNames from "../../../../utils/utils.ts";

const Card = ({
                  className,
                  ...props
              }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={classNames(
            "rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-md",
            className
        )}
        {...props}
    />
);

export default Card;