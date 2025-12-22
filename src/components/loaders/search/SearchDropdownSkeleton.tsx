import { Skeleton } from "@/components/ui/skeleton"



export function SearchDropdownSkeleton() {


    return (


        <aside className="absolute top-0 w-full rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">


            <div className="max-h-[65vh] overflow-y-auto no-scrollbar py-2 space-y-4">


                {/* ================= SUGGESTIONS ================= */}
                <div className="p-2 space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg"
                        >
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-[70%]" />
                        </div>
                    ))}
                </div>


                {/* ================= RECENT SEARCHES ================= */}
                <div className="py-2">

                    <div className="flex items-center justify-between px-5 py-2 mb-1">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-10" />
                    </div>

                    <div className="px-2 space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-7 w-7 rounded-full" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                        ))}
                    </div>

                </div>


                {/* ================= PEOPLE ================= */}
                <div className="py-2">


                    <div className="flex items-center justify-between px-5 py-2 mb-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-12" />
                    </div>


                    <div className="px-2 space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                            >
                                <Skeleton className="h-9 w-9 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                        ))}
                    </div>


                </div>



                {/* ================= MEDIA ================= */}
                <div className="py-2 pb-4">

                    <div className="flex items-center justify-between px-5 py-2 mb-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-12" />
                    </div>

                    <div className="px-2 grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton
                                key={i}
                                className="aspect-video rounded-lg"
                            />
                        ))}
                    </div>

                </div>

            </div>

        </aside>

    )

}
