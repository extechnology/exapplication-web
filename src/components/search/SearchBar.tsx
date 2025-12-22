import { Input } from "@/components/ui/input";
import SearchDropdown from "./SearchDropdown";
import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";




export default function SearchBar() {




    // State Management
    const [query, setQuery] = useState<string>("");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    // Create a stable debounced setter (runs after 500ms)
    const debouncedSearch = useMemo(() => useDebounce((value: string) => { setQuery(value); }, 500), []);




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



    // Handle Select search query
    const handleSelect = (q: string, tab?: string) => {
        setOpen(false);
        setQuery(q);
        navigate(`/explore?q=${encodeURIComponent(q)}${tab ? `&tab=${tab}` : ''}`);
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
                            value={inputValue}
                            onChange={(e) => {
                                const value = e.target.value;
                                setInputValue(value);      // instant UI update
                                debouncedSearch(value);    // debounced API/search
                                setOpen(true);
                            }}
                            onFocus={() => setOpen(true)}
                        />


                        {/* Animated Placeholder */}
                        {!inputValue && (
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


                    {inputValue && (
                        <button onClick={() => { setInputValue(""); setQuery(""); inputRef.current?.focus(); }} className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-colors">
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
                        onClose={() => setOpen(false)}
                    />
                </div>
            )}


        </div>


    );

}
