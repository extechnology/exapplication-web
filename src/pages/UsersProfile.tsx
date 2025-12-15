import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { useGetUserProfile } from "@/services/profile/useProfile";
import ProfileLoader from "@/components/loaders/profile/ProfileLoader";
import ErrorUi from "@/components/loaders/ErrorUi";





export default function UsersProfile() {



    // User Profile Details
    const { data: userProfile, isFetching, isLoading, isError, refetch } = useGetUserProfile();



    // Error Ui
    if (isError) return <ErrorUi retry={refetch} />



    // Loading Ui 
    if (isFetching || isLoading) return <ProfileLoader />




    return (

        <>

            <main className="transition-all duration-300 ease-in-out space-y-0 sm:space-y-5 sm:px-6">

                <ProfileHeader userProfile={userProfile} isCurrentUser={true} />

                <ProfilePosts />

            </main>

        </>

    )


}
