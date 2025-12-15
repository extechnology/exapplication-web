import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";




export default function ProfileLoader() {


    return (



        <main className="transition-all duration-300 ease-in-out space-y-0 sm:space-y-5 sm:px-6">

            {/* Profile Header Skeleton */}
            <section className="w-full animate-fade-in">

                {/* BACKGROUND BANNER */}
                <div className="relative w-full h-72 rounded-b-3xl overflow-hidden">
                    <Skeleton className="absolute inset-0 w-full h-full" />

                    {/* Avatar */}
                    <div className="relative flex flex-col items-center pt-10 z-10">
                        <Skeleton className="h-28 w-28 rounded-full border-4 border-white shadow-xl" />

                        {/* Name */}
                        <Skeleton className="h-5 w-40 mt-4" />

                        {/* Username */}
                        <Skeleton className="h-4 w-28 mt-2" />

                        {/* Role Tag */}
                        <Skeleton className="h-6 w-24 mt-3 rounded-full" />
                    </div>
                </div>

                {/* Floating Stats Card */}
                <div className="w-[90%] sm:w-[380px] bg-white dark:bg-neutral-900 shadow-lg rounded-2xl mx-auto -mt-10 py-4 flex justify-around text-center relative">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-5 w-10" />
                        </div>
                    ))}
                </div>

                {/* Bio */}
                <div className="mt-4 flex justify-center">
                    <Skeleton className="h-4 w-[280px]" />
                </div>

                {/* Edit / Follow Button */}
                <div className="w-[90%] sm:w-[380px] mx-auto mt-4">
                    <Skeleton className="h-12 w-full rounded-full" />
                </div>

            </section>

            {/* Posts Section Skeleton */}
            <section className="animate-fade-in">
                <Card className="border-0 sm:border shadow-none sm:shadow-md rounded-xl">

                    {/* Tabs */}
                    <div className="border-b flex text-sm">
                        <Skeleton className="h-10 w-1/2 rounded-none" />
                        <Skeleton className="h-10 w-1/2 rounded-none" />
                    </div>

                    {/* Grid */}
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <Skeleton
                                    key={i}
                                    className="w-full aspect-square rounded-xl"
                                />
                            ))}
                        </div>
                    </CardContent>

                </Card>
                
            </section>

        </main>


    );

}
