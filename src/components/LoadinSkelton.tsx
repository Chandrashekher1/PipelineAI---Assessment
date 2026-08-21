export default function LoadingSkelton({ count }: { count: number }) {
    return (
        <div className="flex flex-wrap gap-4 mx-16">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-full max-w-[220px] rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="h-3.5 w-9 rounded bg-slate-200" />
                        <div className="h-7 w-7 rounded-full bg-slate-200" />
                    </div>

                    <div className="mt-2 flex h-[150px] items-center justify-center">
                        <div className="h-28 w-28 rounded-full bg-slate-200" />
                    </div>

                    <div className="mt-1">
                        <div className="h-5 w-24 rounded bg-slate-200" />
                    </div>
                    <div className="mt-2 flex gap-1.5">
                        <div className="h-4 w-12 rounded-full bg-slate-200" />
                        <div className="h-4 w-12 rounded-full bg-slate-200" />
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                        {Array.from({ length: 6 }).map((_, statIndex) => (
                            <div key={statIndex} className="flex flex-col items-center gap-1 rounded-lg bg-white/70 px-1 py-1.5">
                                <div className="h-2 w-5 rounded bg-slate-200" />
                                <div className="h-3 w-7 rounded bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}