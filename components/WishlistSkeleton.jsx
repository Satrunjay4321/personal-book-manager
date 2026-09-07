import Skeleton from "./ui/Skeleton";

export default function WishlistSkeleton() {

    return (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (

                <div
                    key={item}
                    className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
                >

                    {/* Title */}

                    <Skeleton className="h-6 w-3/4" />

                    {/* Author */}

                    <Skeleton className="h-4 w-1/2" />

                    {/* Description */}

                    <div className="space-y-2 pt-2">

                        <Skeleton className="h-3 w-full" />

                        <Skeleton className="h-3 w-5/6" />

                        <Skeleton className="h-3 w-2/3" />

                    </div>

                    {/* Pages */}

                    <Skeleton className="h-4 w-1/4" />

                    {/* Buttons */}

                    <div className="flex gap-3 pt-3">

                        <Skeleton className="h-10 flex-1" />

                        <Skeleton className="h-10 w-24" />

                    </div>

                </div>

            ))}

        </div>

    );

}