import { CommonApi } from "@/lib/CommonApi";
import { SearchCursorType } from "./types";


// Get Search Result
export const GetSearchApi = async (q: string, tab: string , cursor?: SearchCursorType) => {

    const params = new URLSearchParams({ q, tab , cursor: JSON.stringify(cursor) });

    return await CommonApi("GET", `/user/profile/?${params.toString()}`);

}