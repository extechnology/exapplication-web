import { Search, ArrowUpRight, X, Image, User, History, SearchX, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSearchPreview } from "@/services/search/useSearch";
import { SearchDropdownSkeleton } from "../loaders/search/SearchDropdownSkeleton";
import { Link } from "react-router-dom";



// Props type
type Props = {
    query: string;
    onSelect: (q: string, tab?: string) => void;
    onClose: () => void;
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





export default function SearchDropdown({ query, onSelect, onClose }: Props) {



    // Get Search Preview data
    const { data: searchPreview, isLoading, isFetching, isError } = useSearchPreview(query);


    // Normalize data
    const suggestions = searchPreview?.suggestions ?? [];
    const people = searchPreview?.people ?? [];
    const posts = searchPreview?.posts ?? [];
    const history = searchPreview?.history ?? [];



    // Check if search preview is loading
    if (isLoading || isFetching) {

        return <SearchDropdownSkeleton />;

    }



    // No results found UI
    if (suggestions.length === 0 && people.length === 0 && posts.length === 0 && history.length === 0) {

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
                    <div className="max-h-[65vh] flex items-center justify-center py-10 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col items-center text-center gap-3"
                        >
                            {/* Icon */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                                <SearchX className="h-7 w-7 text-muted-foreground" />
                            </div>

                            {/* Title */}
                            <p className="text-xl font-medium text-muted-foreground">
                                No results found
                            </p>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground max-w-xs">
                                We couldn’t find anything matching{" "}
                                <span className="font-medium text-foreground">
                                    “{query}”
                                </span>
                            </p>
                        </motion.div>
                    </div>
                </motion.aside>

            </AnimatePresence>
        );
    }




    // Something went wrong UI
    if (isError) {

        return (

            <AnimatePresence>

                <motion.aside
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-0 w-full rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                    role="alert"
                >

                    <div className="max-h-[65vh] flex items-center justify-center py-10 px-4">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col items-center text-center gap-3"
                        >

                            {/* Icon */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <AlertTriangle className="h-7 w-7 text-destructive" />
                            </div>

                            {/* Title */}
                            <p className="text-xl font-medium text-foreground">
                                Something went wrong
                            </p>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground max-w-xs">
                                We couldn’t load search results right now.
                                Please try again in a moment.
                            </p>

                        </motion.div>

                    </div>

                </motion.aside>

            </AnimatePresence>

        );

    }




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
                    <div className="px-2 space-y-1">
                        {query && (
                            <SuggestionItem
                                key={query}
                                icon={<Search className="h-4 w-4" />}
                                label={<span>Search for <span className="text-foreground font-semibold">“{query}”</span></span>}
                                active={false}
                                onClick={() => onSelect(query, "all")}
                            />
                        )}
                    </div>


                    <div className="px-2 space-y-1">
                        {searchPreview?.suggestions?.map((s, idx) => (
                            <SuggestionItem
                                key={idx}
                                icon={<Search className="h-4 w-4" />}
                                label={s}
                                active={false}
                                onClick={() => onSelect(s, "all")}
                            />
                        ))}
                    </div>



                    {/* ================= RECENT SEARCHES ================= */}
                    {history.length > 0 && !query && (

                        <div className="py-2">

                            <SectionHeader title="Recent Searches" icon={<History size={14} />} action={<Button variant="ghost" size="sm" className="h-5 text-[10px] text-red-500 hover:text-red-600 px-2 hover:cursor-pointer">Clear</Button>} />

                            <div className="px-2 space-y-1">

                                {searchPreview?.history.map((h, idx) => (

                                    <motion.div
                                        variants={itemVariants}
                                        key={idx}
                                        onClick={() => onSelect(h, "all")}
                                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:text-foreground hover:bg-secondary/60`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className={`p-1.5 rounded-full transition-colors bg-secondary text-muted-foreground group-hover:bg-background group-hover:text-foreground`}>
                                                <History size={14} className="hover:text-muted-foreground" />
                                            </div>

                                            <span className={`text-sm transition-colors text-foreground/80 group-hover:text-foreground`}>
                                                {h}
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
                    {people.length > 0 && (


                        <div className="py-2">


                            <SectionHeader
                                title="People"
                                icon={<User size={14} />}
                                onAction={() => onSelect(query, "people")}
                            />

                            <div className="px-2 space-y-1">

                                {searchPreview?.people?.map((p) => (

                                    <Link to={`/profile/${p?.user}`}>

                                        <motion.div
                                            variants={itemVariants}
                                            key={p.id}
                                            onClick={() => onClose()}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group transition-colors hover:bg-secondary/50`}
                                        >

                                            <img src={p?.profile_picture ?? "/images.png"} alt={p?.fullname ?? ""} loading="lazy" className="h-9 w-9 rounded-full object-cover border border-border" />

                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium leading-none">{p?.fullname}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{p?.user}</p>
                                            </div>

                                            <ArrowUpRight size={14} className={`transition-all text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0`} />

                                        </motion.div>

                                    </Link>

                                ))}

                            </div>

                        </div>


                    )}



                    {/* ================= POSTS ================= */}
                    {posts.length > 0 && (


                        <div className="py-2 pb-4">

                            <SectionHeader
                                title="Media"
                                icon={<Image size={14} />}
                                onAction={() => onSelect(query, "posts")}
                            />

                            <div className="px-2 grid grid-cols-2 gap-2">

                                {searchPreview?.posts?.map((m) => (

                                    <motion.div
                                        variants={itemVariants}
                                        key={m?.unique_id}
                                        onClick={() => onSelect(query, "posts")}
                                        className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-muted transition-all `}
                                    >

                                        <img src={m?.images?.[0] ?? "/images.png"} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

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
                    className="text-[10px] font-medium text-primary hover:underline flex items-center gap-0.5 transition-all hover:cursor-pointer"
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
