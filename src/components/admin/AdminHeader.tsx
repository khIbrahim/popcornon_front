import { Menu } from "lucide-react";

interface AdminHeaderProps {
    title: string;
    subtitle?: string;
    onMenuClick: () => void;
}

export default function AdminHeader({ title, subtitle, onMenuClick }: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 md:px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-accent text-muted-foreground"
            >
                <Menu className="w-5 h-5" />
            </button>

            <div>
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
            </div>
        </header>
    );
}