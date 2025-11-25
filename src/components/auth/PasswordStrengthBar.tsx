import type { PasswordStrength } from "../../lib/types.ts";

const colors = {
    weak: "bg-red-600 w-1/3",
    medium: "bg-yellow-400 w-2/3",
    strong: "bg-green-500 w-full",
};

const PasswordStrengthBar = ({ strength }: { strength: PasswordStrength }) => {
    return (
        <div className="h-2 w-full bg-zinc-800 rounded-lg mt-2 overflow-hidden">
            <div
                className={`h-full transition-all duration-300 ${colors[strength]}`}
            ></div>
        </div>
    );
};

export default PasswordStrengthBar;
