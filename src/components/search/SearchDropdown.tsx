import { Search, ArrowUpRight, X, Image, User, History } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";


type SearchItem = {
    type: string;
    id: string | number;
    label?: string;
    value?: string;
    name?: string;
    username?: string;
    avatar?: string;
    title?: string;
    thumbnail?: string;
};



type Props = {
    query: string;
    data: {
        suggestions: SearchItem[];
        history: SearchItem[];
        people: SearchItem[];
        media: SearchItem[];
    }
    activeItem?: SearchItem;
    onSelect: (q: string, tab?: string) => void;
};




// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut",
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.98,
        transition: { duration: 0.15 }
    }
};




const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};




export default function SearchDropdown({ query, data, activeItem, onSelect }: Props) {



    // Check if an item is active
    const isActive = (type: string, id: string | number) => {
        return activeItem?.type === type && String(activeItem?.id) === String(id);
    };



    return (

        <AnimatePresence>

            <motion.aside
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-0 w-full rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                role="listbox"
            >


                <div className="max-h-[65vh] overflow-y-auto no-scrollbar py-2">



                    {/* ================= SEARCH SUGGESTIONS ================= */}
                    <div className="p-2 space-y-1">
                        {data.suggestions.map((s) => (
                            <SuggestionItem
                                key={s.id}
                                icon={<Search className="h-4 w-4" />}
                                label={s.type === 'current_query' ? <span>Search for <span className="text-foreground font-semibold">“{s.value}”</span></span> : s.label}
                                active={isActive(s.type, s.id)}
                                onClick={() => onSelect(s.value as string)}
                            />
                        ))}
                    </div>



                    {/* ================= RECENT SEARCHES ================= */}
                    {data.history.length > 0 && (

                        <div className="py-2">

                            <SectionHeader title="Recent Searches" icon={<History size={14} />} action={<Button variant="ghost" size="sm" className="h-5 text-[10px] text-red-500 hover:text-red-600 px-2">Clear</Button>} />

                            <div className="px-2 space-y-1">

                                {data.history.map((h) => (

                                    <motion.div
                                        variants={itemVariants}
                                        key={h.id}
                                        onClick={() => onSelect(h.value as string)}
                                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                                            ${isActive(h.type, h.id) ? "bg-secondary" : "hover:bg-secondary/50"}
                                        `}
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className={`p-1.5 rounded-full transition-colors ${isActive(h.type, h.id) ? "bg-background text-foreground" : "bg-secondary text-muted-foreground group-hover:bg-background group-hover:text-foreground"}`}>
                                                <History size={14} />
                                            </div>

                                            <span className={`text-sm transition-colors ${isActive(h.type, h.id) ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"}`}>
                                                {h.label}
                                            </span>

                                        </div>

                                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-background rounded-full transition-all">
                                            <X size={14} className="text-muted-foreground" />
                                        </button>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    )}




                    {/* ================= PEOPLE ================= */}
                    {data.people.length > 0 && (


                        <div className="py-2">


                            <SectionHeader
                                title="People"
                                icon={<User size={14} />}
                                onAction={() => onSelect(query, "people")}
                            />

                            <div className="px-2 space-y-1">

                                {data.people.map((p) => (

                                    <motion.div
                                        variants={itemVariants}
                                        key={p.id}
                                        onClick={() => onSelect(query, "people")}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group transition-colors
                                             ${isActive(p.type, p.id) ? "bg-secondary ring-1 ring-inset ring-foreground/10" : "hover:bg-secondary/50"}
                                        `}
                                    >

                                        <img src={p.avatar} alt={p.name} loading="lazy" className="h-9 w-9 rounded-full object-cover border border-border" />

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium leading-none">{p.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{p.username}</p>
                                        </div>

                                        <ArrowUpRight size={14} className={`transition-all text-muted-foreground ${isActive(p.type, p.id) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />

                                    </motion.div>

                                ))}

                            </div>

                        </div>


                    )}





                    {/* ================= MEDIA ================= */}
                    {data.media.length > 0 && (


                        <div className="py-2 pb-4">

                            <SectionHeader
                                title="Media"
                                icon={<Image size={14} />}
                                onAction={() => onSelect(query, "media")}
                            />

                            <div className="px-2 grid grid-cols-2 gap-2">

                                {data.media.map((m) => (

                                    <motion.div
                                        variants={itemVariants}
                                        key={m.id}
                                        onClick={() => onSelect(query, "media")}
                                        className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-muted transition-all
                                             ${isActive(m.type, m.id) ? "ring-2 ring-primary ring-offset-2 ring-offset-popover" : ""}
                                        `}
                                    >

                                        <img src={m.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                                        <p className="absolute bottom-2 left-2 text-[10px] text-white font-medium drop-shadow-md truncate max-w-[90%]">
                                            {m.title}
                                        </p>
                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    )}


                </div>

            </motion.aside>

        </AnimatePresence>

    );

}





/* ================= HELPER COMPONENTS ================= */
function SectionHeader({ title, icon, action, onAction }: { title: string; icon: React.ReactNode; action?: React.ReactNode; onAction?: () => void }) {

    return (

        <div className="flex items-center justify-between px-5 py-2 mb-1">

            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                {icon} {title}
            </p>

            {action ? action : (
                <button
                    onClick={onAction}
                    className="text-[10px] font-medium text-primary hover:underline flex items-center gap-0.5 transition-all"
                >
                    See all
                </button>
            )}

        </div>

    );

}




// ================= SUGGESTION ITEM =================
function SuggestionItem({ icon, label, onClick, active = false }: { icon: React.ReactNode; label: React.ReactNode; onClick: () => void; active?: boolean }) {

    return (

        <motion.div
            variants={itemVariants}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer text-sm transition-all
                ${active
                    ? "bg-secondary text-foreground ring-1 ring-inset ring-foreground/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
        >

            <span className={`${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>{icon}</span>
            <span className="truncate flex-1">{label}</span>
            {active && <ArrowUpRight size={14} className="text-muted-foreground opacity-50" />}

        </motion.div>

    );

}
