import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, BadgeCheck, Users } from "lucide-react";
import { searchDummy } from "@/lib/searchDummy";



export default function SearchPeople() {


    const people = searchDummy.people || [];



    if (people.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-in fade-in">
                <Users size={48} className="mb-4 opacity-20" />
                <p>No people found matching your criteria.</p>
            </div>
        );
    }




    return (


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 animate-in slide-in-from-bottom-4 duration-500">


            {people.map((person) => (


                <Card
                    key={person.id}
                    className="group pt-0 relative overflow-hidden transition-all duration-300 hover:shadow-xl sm:hover:-translate-y-1 border-muted/60 bg-card sm:bg-gradient-to-br sm:from-card sm:to-secondary/10"
                >


                    {/* ================= DESKTOP LAYOUT (Block on SM+) ================= */}
                    <div className="hidden sm:block">


                        {/* Header/Banner visual */}
                        <div className="h-40 w-full overflow-hidden">

                            {person.background_image ? (

                                <img src={person.background_image} alt="banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            ) : (

                                <div className="w-full h-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"></div>

                            )}

                        </div>


                        <CardContent className="relative pt-0 px-6 pb-6 flex flex-col items-center -mt-12 text-center">


                            {/* Avatar */}
                            <Avatar className="h-24 w-24 border-4 border-card shadow-lg mb-3 ring-2 ring-transparent group-hover:ring-primary/20 transition-all z-10">

                                <AvatarImage src={person.avatar} alt={person.name} />

                                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                    {person.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>

                            </Avatar>


                            {/* Verification Badge & Name */}
                            <div className="flex items-center gap-1.5 mb-1">

                                <h3 className="font-bold text-lg leading-none">{person.name}</h3>
                                <BadgeCheck size={16} className="text-primary fill-primary/10" />

                            </div>



                            <p className="text-sm text-muted-foreground font-medium mb-4">
                                {person.username}
                            </p>



                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-6 text-sm">

                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">12.5k</span>
                                    <span className="text-muted-foreground text-xs">Followers</span>
                                </div>

                                <div className="h-4 w-px bg-border"></div>

                                <div className="flex flex-col">
                                    <span className="font-bold text-foreground">487</span>
                                    <span className="text-muted-foreground text-xs">Following</span>
                                </div>

                            </div>



                            <Button className="w-full rounded-full gap-2 font-semibold shadow-sm hover:shadow-md transition-all">
                                <UserPlus size={16} />
                                Follow
                            </Button>

                        </CardContent>

                    </div>



                    {/* ================= MOBILE LAYOUT (Flex Row, Hidden on SM+) ================= */}
                    <div className="sm:hidden flex items-center p-3 gap-3">
                       
                        <Avatar className="h-14 w-14 border border-border">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <h3 className="font-semibold text-sm truncate">{person.name}</h3>
                                <BadgeCheck size={14} className="text-primary fill-primary/10" />
                            </div>
                            <p className="text-xs text-muted-foreground truncate mb-1">{person.username}</p>
                            <p className="text-xs text-muted-foreground/80 line-clamp-1">Followed by sarang + 4 more</p>
                        </div>

                        <Button size="sm" variant="secondary" className="rounded-lg h-9 px-4 font-semibold shrink-0">
                            Follow
                        </Button>

                    </div>


                </Card>

            ))}

        </div>

    );

}
