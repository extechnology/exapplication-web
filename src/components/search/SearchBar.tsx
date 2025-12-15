import { Input } from "@/components/ui/input";
import SearchDropdown from "./SearchDropdown";
import { useState, useRef, useEffect } from "react";
import { searchDummy } from "@/lib/searchDummy";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";




export default function SearchBar() {



    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    // Placeholder Animation Logic
    const placeholders = [
        "Search for people...",
        "Discover trending posts...",
        "Find viral videos...",
        "Search for creators..."
    ];


    const [placeholderIndex, setPlaceholderIndex] = useState(0);



    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);




    // Filter Data
    const filteredPeople = searchDummy.people.map(p => ({ ...p, type: 'people' })).filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const filteredMedia = searchDummy.media.map(m => ({ ...m, type: 'media' })).filter(m => m.title.toLowerCase().includes(query.toLowerCase()));




    // Restore Requests: Suggestions & History mapping
    const rawSuggestions = searchDummy.suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())).map((s, i) => ({ type: 'suggestion', id: `s-${i}`, label: s, value: s }));



    // Add "Search for [query]" at the top if there is a query
    const suggestions = query ? [{ type: 'current_query', id: 'current', label: query, value: query }, ...rawSuggestions] : rawSuggestions;



    const history = searchDummy.history.filter(h => h.toLowerCase().includes(query.toLowerCase())).map((h, i) => ({ type: 'history', id: `h-${i}`, label: h }));



    // Combine flat list for keyboard navigation (prioritizing history/suggestions if query matches, or just general)
    const flatList = [...history, ...suggestions, ...filteredPeople, ...filteredMedia];
    const activeItem = selectedIndex >= 0 ? flatList[selectedIndex] : undefined;



    const handleSelect = (q: string, tab?: string) => {
        setOpen(false);
        navigate(`/search?q=${encodeURIComponent(q)}${tab ? `&tab=${tab}` : ''}`);
    };



    // Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    // Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => prev < flatList.length - 1 ? prev + 1 : prev);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (e.key === "Enter") {
            if (activeItem) {
                // If item selected, go to type
                const label = (activeItem as any).label || (activeItem as any).name || (activeItem as any).title || query;
                const type = activeItem.type === 'people' ? 'people' : activeItem.type === 'media' ? 'posts' : undefined;
                handleSelect(label, type);
            } else if (query) {
                setOpen(false);
                navigate(`/search?q=${encodeURIComponent(query)}`);
            }
        }
    };



    return (


        <div className="relative w-full max-w-2xl z-[100]" ref={containerRef}>


            {/* Search Input Container with Always-On Border Beam */}
            <div className="relative group rounded-full p-[2px] overflow-hidden">


                {/* Animated Gradient Border (Beam) - Always Visible & Smooth */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-border-beam transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-30 blur-md animate-pulse" />



                {/* Inner Background */}
                <div className="relative bg-background/80 backdrop-blur-xl rounded-full flex items-center z-10 px-4 h-12 ring-1 ring-white/10 group-focus-within:ring-primary/50 transition-all shadow-lg">


                    <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0 group-focus-within:text-primary transition-colors" />


                    <div className="relative w-full h-full flex items-center">

                        <Input
                            ref={inputRef}
                            className="h-full border-0 focus-visible:ring-0 p-0 shadow-none bg-transparent placeholder:text-transparent relative z-20 text-foreground text-base"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setOpen(true);
                                setSelectedIndex(-1);
                            }}
                            onFocus={() => setOpen(true)}
                            onKeyDown={handleKeyDown}
                        />


                        {/* Animated Placeholder */}
                        {!query && (
                            <div className="absolute inset-0 flex items-center pointer-events-none z-10 pl-1">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={placeholderIndex}
                                        initial={{ y: 5, opacity: 0 }}
                                        animate={{ y: 0, opacity: 0.5 }}
                                        exit={{ y: -5, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-base text-muted-foreground truncate font-medium"
                                    >
                                        {placeholders[placeholderIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        )}

                    </div>



                    {query && (
                        <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-colors">
                            <X size={16} />
                        </button>
                    )}


                </div>


            </div>



            {/* Search Dropdown */}
            {open && (
                <div className="absolute top-14 left-0 right-0 z-50">
                    <SearchDropdown
                        query={query}
                        onSelect={handleSelect}
                        data={{
                            suggestions: suggestions,
                            history: history,
                            people: filteredPeople,
                            media: filteredMedia
                        }}
                        activeItem={activeItem}
                    />
                </div>
            )}


        </div>


    );

}
