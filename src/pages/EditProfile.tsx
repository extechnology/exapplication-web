import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { User, CircleCheckBig, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProfessionalTitleSearch } from "@/components/profile/editprofile/ProfessionalTitleSearch";
import { useEditProfileForm } from "@/hooks/profile/useEditProfileForm";
import ErrorUi from "@/components/loaders/ErrorUi";
import EditProfileSkeleton from "@/components/loaders/profile/EditLoader";
import ImageUploader from "@/components/profile/editprofile/ImageUploader";
import Bio from "@/components/profile/editprofile/Bio";
import Gender from "@/components/profile/editprofile/Gender";
import Website from "@/components/profile/editprofile/Website";
import Username from "@/components/profile/editprofile/Username";
import DateOfBirth from "@/components/profile/editprofile/DateOfBirth";
import DisplayName from "@/components/profile/editprofile/DisplayName";





const EditProfile = () => {


    // Navigation hook
    const navigate = useNavigate();


    // Custom hook for form logic and state
    const {
        form,
        onSubmit,
        userProfile,
        isLoading,
        isFetching,
        isError,
        isPending,
        refetch,
        preview,
        setPreview,
        backgroundPreview,
        setBackgroundPreview,
        debouncedUsername,
        setDebouncedUsername,
        debounceUsername,
        usernameData,
        usernameLoading,
        usernameError,
        isChanged
    } = useEditProfileForm();



    // Error and Loading UI
    if (isError) return <ErrorUi retry={refetch} />;
    if (isLoading || isFetching) return <EditProfileSkeleton />;



    return (


        <section
            aria-label="edit-profile"
            className="container w-full mx-auto py-0 sm:py-0 px-0 sm:px-6 animate-fade-in"
        >


            <Form {...form}>


                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 sm:space-y-6">


                    {/* Profile Header Card with Image Uploader */}
                    <ImageUploader
                        form={form}
                        preview={preview}
                        backgroundPreview={backgroundPreview}
                        userProfile={userProfile}
                        setPreview={setPreview}
                        setBackgroundPreview={setBackgroundPreview}
                    />


                    {/* Profile Information Card */}
                    <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border sm:shadow-sm sm:rounded-xl">


                        <CardHeader className="mb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User size={18} /> Profile Information
                            </CardTitle>
                            <CardDescription>Public profile details</CardDescription>
                        </CardHeader>


                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">

                            {/* Username */}
                            <Username
                                form={form}
                                usernameError={usernameError}
                                usernameLoading={usernameLoading}
                                usernameData={usernameData}
                                userUsername={userProfile?.username}
                                debounceUsername={debounceUsername}
                                setDebouncedUsername={setDebouncedUsername}
                            />


                            {/* Display Name */}
                            <DisplayName form={form} />


                            {/* Website */}
                            <Website form={form} />


                            {/* Professional Title */}
                            <ProfessionalTitleSearch form={form} />

                            {/* Bio */}
                            <Bio form={form} />


                        </CardContent>

                    </Card>



                    {/* Personal Information Card */}
                    <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border sm:shadow-sm sm:rounded-xl">

                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <User size={18} /> Personal Information
                            </CardTitle>
                            <CardDescription>Private profile details</CardDescription>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">

                            {/* Date of Birth */}
                            <DateOfBirth form={form} />

                            {/* Gender */}
                            <Gender form={form} />
                            
                        </CardContent>

                    </Card>



                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 px-5 sm:px-0">

                        <Button type="button" variant="outline" className="hover:cursor-pointer" onClick={() => navigate("/user-profile")}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="default"
                            className="bg-white text-black border hover:bg-gray-100 hover:cursor-pointer"
                            disabled={
                                isPending ||
                                !form.formState.isValid ||
                                !isChanged ||
                                !!(debouncedUsername && usernameData && !usernameData.is_available)
                            }
                        >
                            Save Changes{" "}

                            {isPending ? (
                                <Loader size={16} className="animate-spin duration-1000 mt-1" />
                            ) : (
                                <CircleCheckBig size={16} className="mt-1" />
                            )}

                        </Button>

                    </div>

                </form>

            </Form>

        </section>

    );

};


export default EditProfile;
