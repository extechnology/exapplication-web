import { searchDummy } from "@/lib/searchDummy";
import { MessageCircle, Heart, Film, Image as ImageIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";




export default function SearchPosts() {


    const posts = searchDummy.posts || [];
    const media = searchDummy.media || [];



    // Combine items into a single list
    const combinedItems = [
        ...media.map(m => ({ ...m, _type: 'media' })),
        ...posts.map(p => ({ ...p, _type: 'post' }))
    ];



    // Simple shuffle for variety
    combinedItems.sort(() => Math.random() - 0.5);



    if (combinedItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-in fade-in">
                <p>No posts found.</p>
            </div>
        );
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10 animate-in fade-in duration-500">
            {combinedItems.map((item: any, idx) => (
                <PostItem key={`${item._type}-${item.id}-${idx}`} item={item} />
            ))}
        </div>
    );


}




function PostItem({ item }: { item: any }) {


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

