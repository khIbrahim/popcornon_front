import {
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
} from "lucide-react";

interface CinemasPaginationProps {
    currentPage: number;
    lastPage: number;
    total: number;
    from: number | null;
    to: number | null;
    isFetching: boolean;
    onPageChange: (page: number) => void;
}

function getVisiblePages(
    currentPage: number,
    lastPage: number,
): number[] {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(lastPage, currentPage + 2);

    return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index,
    );
}

export default function CinemasPagination({currentPage, lastPage, total, from, to, isFetching, onPageChange}: CinemasPaginationProps)
{
    const pages = getVisiblePages(currentPage, lastPage);

    return (
        <nav
            aria-label="Pagination des cinémas"
            className="px-4 pb-12"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-400">
                    {from !== null && to !== null
                        ? `${from} à ${to} sur ${total} cinémas`
                        : `${total} cinéma${total > 1 ? "s" : ""}`}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Page précédente"
                        disabled={currentPage === 1 || isFetching}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="h-10 px-3 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {pages[0] > 1 && (
                        <>
                            <PageButton
                                page={1}
                                currentPage={currentPage}
                                disabled={isFetching}
                                onClick={onPageChange}
                            />

                            {pages[0] > 2 && (
                                <span className="text-slate-500">
                                    …
                                </span>
                            )}
                        </>
                    )}

                    {pages.map((page) => (
                        <PageButton
                            key={page}
                            page={page}
                            currentPage={currentPage}
                            disabled={isFetching}
                            onClick={onPageChange}
                        />
                    ))}

                    {pages[pages.length - 1] < lastPage && (
                        <>
                            {pages[pages.length - 1] < lastPage - 1 && (
                                <span className="text-slate-500">
                                    …
                                </span>
                            )}

                            <PageButton
                                page={lastPage}
                                currentPage={currentPage}
                                disabled={isFetching}
                                onClick={onPageChange}
                            />
                        </>
                    )}

                    <button
                        type="button"
                        aria-label="Page suivante"
                        disabled={
                            currentPage === lastPage ||
                            isFetching
                        }
                        onClick={() => onPageChange(currentPage + 1)}
                        className="h-10 px-3 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        {isFetching ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}

interface PageButtonProps {
    page: number;
    currentPage: number;
    disabled: boolean;
    onClick: (page: number) => void;
}

function PageButton({
                        page,
                        currentPage,
                        disabled,
                        onClick,
                    }: PageButtonProps) {
    const isActive = page === currentPage;

    return (
        <button
            type="button"
            disabled={disabled}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onClick(page)}
            className={`h-10 min-w-10 px-3 rounded-lg text-sm font-medium transition ${
                isActive
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            } disabled:cursor-not-allowed`}
        >
            {page}
        </button>
    );
}