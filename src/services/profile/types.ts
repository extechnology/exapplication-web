
// User Profile Details Types
export interface UserCreditVault {
  id: number;
  username: string;
  total_credits: string;
  total_value: string;
  gained_credits: string;
  spent_credits: string;
  purchased_credits: string;
  created_at: string;
  updated_at: string;
  user: number;
}



export interface UserTotalPosts {
  unique_id: string;
  title: string;
  caption: string;
  images?: string[];
  video?: string | null;
  created_at: string;
  updated_at: string;
  username: string;
  fullname: string | null;
  profile_picture: string;
  is_liked: boolean;
  is_followed: boolean;
  total_comments: number;
  total_likes: number;
  comments: { id: number; comment: string; created_at: string; updated_at: string; user: number; post_video: string }[];
  likes: { user: string; profile_picture: string }[];
  type: "image" | "video" | "text";
}



export interface UserProfileType {
  id: number;
  username: string;
  user_credit_vault: UserCreditVault;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  user_total_posts: UserTotalPosts[];
  user_total_post_count: number;
  account_id: string;
  designation: string | null;
  bio: string | null;
  profile_picture: string | null;
  background_image: string | null;
  location: string | null;
  website: string | null;
  fullname: string;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  account_plan: string;
  plan_purchase_date: string | null;
  plan_expiry_date: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  user: number;
}
