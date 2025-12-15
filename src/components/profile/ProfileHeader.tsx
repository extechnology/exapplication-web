import { Link } from "react-router-dom";
import ProfileStat from "./ProfileStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, MessageCircle } from "lucide-react";
import { UserProfileType } from "@/services/profile/types";




// Profile Header Props
interface ProfileHeaderProps {
    isCurrentUser: boolean;
    userProfile?: UserProfileType;
}



const ProfileHeader = ({ isCurrentUser, userProfile }: ProfileHeaderProps) => {



    return (



        <section className="w-full animate-fade-in">



            {/* TOP HEADER WITH BACKGROUND IMAGE + BLACK OVERLAY */}
            <div className="relative w-full h-72 rounded-b-3xl overflow-hidden z-10">


                {/* BACKGROUND IMAGE */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${userProfile?.background_image || "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?cs=srgb&dl=pexels-minan1398-853168.jpg&fm=jpg"})`
                    }}
                />


                {/* Black Inset Overlay (does NOT affect content) */}
                <div className="absolute inset-0 bg-black/55" />


                {/* FOREGROUND CONTENT */}
                <div className="relative flex flex-col items-center pt-10 z-10">


                    {/* SETTINGS BUTTON (RIGHT) */}
                    <Link to={"/settings"} className="sm:hidden block">
                        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                            <Settings className="text-white" size={22} />
                        </button>
                    </Link>


                    {/* AVATAR */}
                    <Avatar className="h-28 w-28 border-4 border-white shadow-xl rounded-full">
                        <AvatarImage src={userProfile?.profile_picture ?? "/images.png"} />
                        <AvatarFallback className="text-4xl font-bold">
                            {userProfile?.fullname?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>


                    {/* NAME */}
                    <h1 className="mt-1 text-white text-2xl font-bold">
                        {userProfile?.fullname}
                    </h1>


                    {/* USERNAME */}
                    <p className="text-white/80 text-sm">@{userProfile?.username}</p>


                    {/* ROLE TAG */}
                    {userProfile?.designation && (
                        <span className="mt-1 bg-white/20 backdrop-blur-md text-white text-xs px-4 py-1 rounded-full">
                            {userProfile?.designation}
                        </span>
                    )}

                </div>

            </div>



            {/* STATS CARD — FLOATING */}
            <div className="w-[90%] sm:w-[380px] bg-white dark:bg-neutral-900 shadow-lg rounded-2xl mx-auto -mt-10 py-4 flex justify-around text-center z-20 relative">

                <ProfileStat label="Posts" value={userProfile?.user_total_posts ?? 0} />
                <ProfileStat label="Followers" value={userProfile?.followers_count ?? 0} />
                <ProfileStat label="Following" value={userProfile?.following_count ?? 0} />

            </div>


            {/* BIO */}
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 my-3 max-w-xl mx-auto px-2 sm:px-0">
                {userProfile?.bio || ""}
            </p>


            {/* FOLLOW BUTTON */}
            {!isCurrentUser ? (
                <div className="w-[90%] sm:w-[380px] mx-auto mt-4 flex items-center gap-3">

                    <button className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-medium shadow-md">
                        {userProfile?.is_following ? "Unfollow" : "Follow"}
                    </button>

                    <button className="p-3 rounded-full bg-white shadow-md dark:bg-neutral-800">
                        <MessageCircle size={20} className="text-neutral-700 dark:text-neutral-200" />
                    </button>

                </div>
            ) : (

                <div className="w-[90%] sm:w-[380px] mx-auto mt-4">
                    <Link to={'/edit-profile'}>
                        <button className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-medium shadow-md hover:cursor-pointer">
                            Edit Profile
                        </button>
                    </Link>
                </div>

            )}


        </section>


    );

};



export default ProfileHeader;
