interface GeolocationStatusProps {
    isLoading: boolean;
    error: string | null;
}

export default function GeolocationStatus({
    isLoading,
    error,
}: GeolocationStatusProps) {
    if (!isLoading && !error) return null;

    return (
        <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {isLoading && (
                    <div className="flex items-center justify-center gap-3 py-8">
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-400">Localisation en cours...</p>
                    </div>
                )}
                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                        {error}
                    </div>
                )}
            </div>
        </section>
    );
}
