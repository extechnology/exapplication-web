
// Type for the cursor pagination
export type SearchCursorType = {
    people?: number;
    posts?: number;
};



// Search Preview Types
export type SearchResponseType = {
    people: Person[];
    posts: Post[];
    suggestions: string[];
    history: string[];
};

export type Person = {
    id: number;
    account_id: string;
    designation: string | null;
    bio: string | null;
    profile_picture: string | null;
    location: string | null;
    website: string | null;
    fullname: string | null;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    background_image: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;
    deleted_at: string | null;
    user: string;
    is_followed: boolean;
};

export type Post = {
    unique_id: string;
    title: string;
    caption: string;
    images: string[];
    video: string | null;
    created_at: string;
    updated_at: string;
    username: string;
    fullname: string | null;
    profile_picture: string | null;
    is_liked: boolean;
    is_followed: boolean;
    total_comments: number;
    total_likes: number;
    comments: Comment[];
    likes: Like[];
    type: "image" | "video";
};

export type Like = {
    user: string;
    profile_picture: string | null;
};

export type Comment = {
    id?: number;
    user?: string;
    comment?: string;
    created_at?: string;
};
