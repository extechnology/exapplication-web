import ProfileLoader from "@/components/loaders/profile/ProfileLoader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { useGetProfile } from "@/services/profile/useProfile";
import { useParams } from "react-router-dom";
import ErrorUi from "@/components/loaders/ErrorUi";




export default function Profile() {


    // get user name of the user
    const { username } = useParams();



    // Profile Details
    const { data: userProfile, isFetching, isLoading, isError } = useGetProfile(username as string);



    // Error Ui
    if (isError) return <ErrorUi />



    // Loading Ui 
    if (isFetching || isLoading) return <ProfileLoader />



    return (

        <>

            <main className="transition-all duration-300 ease-in-out space-y-0 sm:space-y-5 sm:px-6">

                <ProfileHeader userProfile={userProfile} isCurrentUser={false} />

                <ProfilePosts />

            </main>

        </>

    )



}
