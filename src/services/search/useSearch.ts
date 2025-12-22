import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetSearchApi, GetSearchPreviewApi } from "./SearchApi";
import type { SearchResponseType } from "./types";




// Get Search Results 
export const useSearchInfinite = (q: string, tab: string) => {


    return useInfiniteQuery({

        queryKey: ["search", q, tab],


        queryFn: async ({ pageParam }) =>

            await GetSearchApi(q, tab, pageParam),

        initialPageParam: { people: 1, posts: 1 },


        getNextPageParam: (lastPage) => {

            const { peopleNextCursor, postsNextCursor } = lastPage.pagination;

            if (!peopleNextCursor && !postsNextCursor) return undefined;

            return {
                people: peopleNextCursor,
                posts: postsNextCursor,
            };
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};




// Get Search Preview 
export const useSearchPreview = (q: string) => {

    return useQuery<SearchResponseType>({

        queryKey: ["search-preview", q],

        queryFn: async () => {

            return await GetSearchPreviewApi(q) as SearchResponseType;
        },

        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,

    });

};