import classNames from "../../../utils/utils.ts";

type MovieStatus = "active" | "draft" | "archived";

const Badge = ({
                   status,
               }: {
    status: MovieStatus;
}) => {
    const map: Record<MovieStatus, { label: string; classes: string }> = {
        active: {
            label: "Actif",
            classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
        },
        draft: {
            label: "Brouillon",
            classes: "bg-amber-500/15 text-amber-400 border-amber-500/40",
        },
        archived: {
            label: "Archivé",
            classes: "bg-slate-500/15 text-slate-300 border-slate-500/40",
        },
    };

    return (
        <span
            className={classNames(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                map[status].classes
            )}
        >
      {map[status].label}
    </span>
    );
};

export default Badge;