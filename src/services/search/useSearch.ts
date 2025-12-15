import { useInfiniteQuery } from "@tanstack/react-query";
import { GetSearchApi } from "./SearchApi";




// Get Search Results 
export const useSearchInfinite = (q: string, tab: string) => {


    return useInfiniteQuery({

        queryKey: ["search", q, tab],


        queryFn: ({ pageParam }) =>
            
        GetSearchApi(q, tab, pageParam),

        initialPageParam: { people: 1, posts: 1 },

        
        getNextPageParam: (lastPage) => {
            
            const { peopleNextCursor, postsNextCursor } = lastPage.pagination;

            if (!peopleNextCursor && !postsNextCursor) return undefined;

            return {
                people: peopleNextCursor,
                posts: postsNextCursor,
            };
        },

        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};