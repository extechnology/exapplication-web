import { searchDummy } from "@/lib/searchDummy";
import { Flame, TrendingUp, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect } from "react";



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

function TrendingPostItem({ item }: { item: any }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => { });
        }
    }, [item.type]);

    return (
        <motion.div
            variants={itemVariants}
            className="group relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-border/50"
        >
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}

            {/* Trending Badge (Top Left) */}
            <div className="absolute top-3 left-3 z-20">
                <Badge variant="secondary" className="bg-orange-500/90 backdrop-blur-md text-white border-0 shadow-lg text-[10px] px-2 py-0.5 flex gap-1 font-bold">
                    <TrendingUp size={10} /> Trending
                </Badge>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                    {item.type === 'video' && <Play size={12} className="text-white fill-white" />}
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">#{item.subreddit || 'viral'}</span>
                </div>
                <p className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-snug drop-shadow-md group-hover:text-orange-100 transition-colors">
                    {item.title}
                </p>
                {/* Extra info visible on hover (desktop) or always (mobile) */}
                <div className="mt-2 flex items-center gap-4 text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>{item.upvotes || '12.5'}k Likes</span>
                    <span>{item.comments || '400'} Comments</span>
                </div>
            </div>
        </motion.div>
    );
}
