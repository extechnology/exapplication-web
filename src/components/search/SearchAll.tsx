import SearchPeople from "./SearchPeople";
import SearchPosts from "./SearchPosts";
import { Button } from "@/components/ui/button";
import { ChevronRight, Telescope, User } from "lucide-react";




interface SearchAllProps {
    onTabChange: (value: string) => void;
}




export default function SearchAll({ onTabChange }: SearchAllProps) {


    return (



        <div className="space-y-8 animate-in fade-in duration-500">


            {/* People Section */}
            <section className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.02)]">

                <div className="flex items-center justify-between px-2 sm:px-0">

                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <User className="w-5 h-5" /> People
                        <span className="text-sm font-normal text-muted-foreground hidden sm:inline-block">• Suggested for you</span>
                    </h2>

                    <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 -mr-2 sm:mr-0 gap-1 group/btn" onClick={() => onTabChange("people")}>
                        View all <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Button>

                </div>

                <SearchPeople />

            </section>


            {/* Posts Section */}
            <section className="space-y-4">

                <div className="flex items-center justify-between px-2 sm:px-0">

                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">

                        <Telescope className="w-5 h-5" /> Explore

                        <span className="text-sm font-normal text-muted-foreground hidden sm:inline-block">• Suggested for you</span>

                    </h2>

                    <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 -mr-2 sm:mr-0 gap-1 group/btn" onClick={() => onTabChange("posts")}>
                        View all <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Button>

                </div>

                <SearchPosts />

            </section>

        </div>

    );


}

