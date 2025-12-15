import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";






export default function EditProfileSkeleton() {


    return (


        <section className="container w-full mx-auto py-0 sm:py-0 px-0 sm:px-6 animate-fade-in">

            {/* Background + Avatar */}
            <Card className="border-0 bg-background shadow-none sm:shadow-sm rounded-t-none rounded-b-xl overflow-hidden pt-0 !mb-0">

                {/* Background Image Skeleton */}
                <div className="relative w-full h-40 sm:h-72 rounded-b-xl overflow-hidden">
                    <Skeleton className="w-full h-full rounded-b-xl" />

                    {/* Edit button skeleton */}
                    <div className="absolute bottom-2 right-2">
                        <Skeleton className="h-7 w-20 rounded-md" />
                    </div>
                </div>

                {/* Avatar Skeleton */}
                <CardHeader className="pt-0 sm:pt-10 relative">
                    <div className="absolute -top-24 sm:-top-24 left-1/2 -translate-x-1/2 sm:left-2 sm:translate-x-0">
                        <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-background shadow-lg" />
                    </div>

                    {/* Title skeleton */}
                    <div className="mt-14 sm:mt-2 hidden sm:block space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-52" />
                    </div>
                </CardHeader>
            </Card>

            {/* Profile Information Card */}
            <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border sm:shadow-sm sm:rounded-xl mt-6">
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">

                    {/* 6 fields skeleton */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    ))}

                </CardContent>
            </Card>

            {/* Personal Information Card */}
            <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border sm:shadow-sm sm:rounded-xl mt-6">
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">

                    {/* 2 fields */}
                    {[1, 2].map((i) => (
                        <div key={i} className="flex flex-col space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    ))}

                </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex justify-end gap-3 px-5 sm:px-0 mt-6">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>

        </section>
    );
}
