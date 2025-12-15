import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SearchAll from "@/components/search/SearchAll";
import SearchPeople from "@/components/search/SearchPeople";
import SearchPosts from "@/components/search/SearchPosts";
import SearchTrending from "@/components/search/SearchTrending";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";






export default function SearchResult() {



  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const tab = searchParams.get("tab") || "all";



  const handleTabChange = (val: string) => {
    setSearchParams({ q: query, tab: val });
  };



  // Tabs headers
  const tabs = [
    { id: "all", label: "All" },
    { id: "trending", label: "Trending" },
    { id: "posts", label: "Posts" },
    { id: "people", label: "People" },
  ];


  return (


    <section aria-label="Search Results" className="w-full mx-auto px-4 sm:px-8 pt-6 pb-20 min-h-screen">


      <div className="flex flex-col gap-6">



        {/* Search Header */}
        <div className="flex flex-col gap-2 pb-2">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <Search className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">Search</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
            Results for <span className="text-primary">"{query}"</span>
          </h1>
        </div>


        <Tabs value={tab} onValueChange={handleTabChange} className="w-full space-y-2">


          {/* Modern Floating Pill Tab Bar - Full Width */}
          <div className="bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-300">


            <TabsList className="relative w-full h-14 p-1.5 grid grid-cols-4 gap-2 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-white/20 dark:border-white/5 backdrop-blur-md">


              {tabs.map((t) => (


                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className={cn(
                    "relative h-full rounded-full text-sm font-bold transition-all duration-500 z-10 hover:cursor-pointer",
                    tab === t.id ? "text-white dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >

                  {tab === t.id && (
                    <motion.div
                      layoutId="active-tab-pill"
                      className="absolute inset-0 z-10 rounded-full bg-white shadow-lg shadow-black/10 border border-zinc-200 dark:bg-gradient-to-br dark:from-zinc-800 dark:via-zinc-900 dark:to-black dark:border-zinc-800 dark:shadow-2xl dark:shadow-black/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}


                  <span className="relative z-20 flex items-center gap-2 justify-center drop-shadow-sm">
                    {t.label}
                  </span>


                </TabsTrigger>

              ))}

            </TabsList>

          </div>



          {/* Content Areas */}
          <div className="min-h-[50vh]">

            <TabsContent value="all" className="mt-0 focus-visible:ring-0">
              <SearchAll onTabChange={handleTabChange} />
            </TabsContent>

            <TabsContent value="trending" className="mt-0 focus-visible:ring-0">
              <SearchTrending />
            </TabsContent>

            <TabsContent value="posts" className="mt-0 focus-visible:ring-0">
              <SearchPosts />
            </TabsContent>

            <TabsContent value="people" className="mt-0 focus-visible:ring-0">
              <SearchPeople />
            </TabsContent>


          </div>


        </Tabs>

      </div>

    </section>


  );


}

