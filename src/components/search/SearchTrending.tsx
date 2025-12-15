import { searchDummy } from "@/lib/searchDummy";
import { Flame, Heart, MessageCircle, Film, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";



const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};



const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};



export default function SearchTrending() {


    const trendingPeople = searchDummy.people.slice(0, 5);
    const trendingPosts = searchDummy.media.slice(0, 8); // Show more posts for the grid




    return (



        <div className="space-y-12 animate-in fade-in duration-700 pb-32">



            <section className="space-y-10">



                {/* Header */}
                <div className="flex items-center gap-3 px-2 sm:px-0">

                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-2xl shadow-lg shadow-orange-500/20">
                        <Flame className="text-white fill-white animate-pulse" size={24} />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Trending</h2>
                        <p className="text-sm text-muted-foreground font-medium">What's happening right now</p>
                    </div>

                </div>



                {/* Trending People (Neon Glow Style) - Horizontal Scroll */}
                <div className="relative">


                    <div className="flex items-center justify-between mb-5 px-2 sm:px-0">
                        <h3 className="text-sm font-bold text-foreground/80 uppercase tracking-wider flex items-center gap-2">
                            Creators on the Rise
                        </h3>
                    </div>


                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 sm:px-0 no-scrollbar snap-x"
                    >

                        {trendingPeople.map((p, i) => (


                            <motion.div
                                variants={itemVariants}
                                key={p.id}
                                className="snap-start flex flex-col items-center gap-3 min-w-[90px] cursor-pointer group"
                            >

                                <div className="relative">

                                    {/* Neon Glow Effect */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 blur-md opacity-40 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300" />


                                    <div className="relative p-1 bg-background rounded-full">
                                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-background transition-transform duration-300 group-hover:scale-105">
                                            <AvatarImage src={p.avatar} className="object-cover" />
                                            <AvatarFallback>{p.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>


                                    <Badge className="absolute -bottom-2 -right-1 h-7 w-7 rounded-full p-0 flex items-center justify-center bg-foreground text-background border-4 border-background shadow-xl text-xs font-bold z-10">
                                        {i + 1}
                                    </Badge>
                                </div>


                                <span className="text-xs font-bold text-center truncate w-24 group-hover:text-primary transition-colors mt-1">{p.name}</span>


                            </motion.div>

                        ))}

                    </motion.div>


                </div>



                {/* Trending Posts (Grid Layout) */}
                <div className="relative">

                    <div className="flex items-center justify-between mb-6 px-2 sm:px-0">
                        <h3 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
                            Viral Posts
                        </h3>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {trendingPosts.map((m) => (
                            <TrendingPostItem key={m.id} item={m} />
                        ))}
                    </motion.div>

                </div>

            </section>

        </div>

    );

}





// Trending Post Item
function TrendingPostItem({ item }: { item: any }) {



    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {
                // Autoplay was prevented
            });
        }
    }, [item.type]);




    return (


        <div
            className="group relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-border/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >


            {/* ================= CONTENT LAYER ================= */}
            {item._type === 'media' ? (


                <div className="w-full h-full relative">


                    {item.type === 'video' ? (

                        <video
                            ref={videoRef}
                            src={item.url}
                            poster={item.thumbnail}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                        />

                    ) : (

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                    )}

                    {/* Media Type Badge (Top Right) */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full z-10">
                        {item.type === 'video' ? <Film size={14} /> : <ImageIcon size={14} />}
                    </div>


                </div>


            ) : (


                // TEXT POST RENDERING
                <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 relative">

                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-purple-400 to-pink-400"></div>

                    <p className="text-xs font-bold opacity-60 mb-3 uppercase tracking-widest relative z-10">{item.subreddit}</p>

                    <h3 className="font-bold text-lg md:text-xl leading-snug line-clamp-4 relative z-10 text-foreground/90">
                        "{item.title}"
                    </h3>

                </div>

            )}


            {/* ================= INFO OVERLAY (Always visible Title/Bio Gradient) ================= */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 text-white transition-opacity duration-300">

                <h3 className="font-bold text-sm md:text-base line-clamp-1 mb-1 drop-shadow-md">{item.title}</h3>

                {item.Bio && (
                    <p className="text-xs text-white/80 line-clamp-2 md:line-clamp-1 mb-2 leading-relaxed">
                        {item.Bio}
                    </p>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs font-medium text-white/90">

                    <div className="flex items-center gap-1.5">
                        <Heart className={cn("transition-colors", isHovered ? "fill-red-500 text-red-500" : "fill-transparent")} size={16} />
                        <span>{Math.floor((item.upvotes || Math.random() * 10) * 10) / 10}k</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span>{item.comments || Math.floor(Math.random() * 100)}</span>
                    </div>

                </div>

            </div>


        </div>

    );
}
