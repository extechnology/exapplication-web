import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usecheckUsername } from "@/services/auth/useAuth";
import { useGetUserProfile, useEditUserProfile } from "@/services/profile/useProfile";
import { useDebounce } from "../useDebounce";
import { profileFormSchema, ProfileFormValues } from "@/schemas/profileSchema";



export const useEditProfileForm = () => {



    // User Profile Details and Mutations
    const { data: userProfile, isFetching, isLoading, isError, refetch } = useGetUserProfile();
    const { mutate: editUserProfile, isPending } = useEditUserProfile();



    // Local State
    const [preview, setPreview] = useState<string | null>("");
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>("");
    const [debouncedUsername, setDebouncedUsername] = useState<string>("");
    const [isChanged, setIsChanged] = useState<boolean>(false);



    // Form Initialization
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            fullname: "",
            gender: "",
            date_of_birth: "",
            website: "",
            bio: "",
            designation: "",
            profile_picture: undefined,
            background_image: undefined
        }
    });



    // Username Availability Check
    const { data: usernameData, isFetching: usernameLoading, isError: usernameError } = usecheckUsername(debouncedUsername);



    // Debounce Username Callback
    const debounceUsername = useCallback(
        useDebounce((val: string) => {
            if (!val || val === userProfile?.username) return;
            setDebouncedUsername(val);
        }, 500),
        [userProfile]
    );



    // Set Default Values
    useEffect(() => {

        if (userProfile) {

            form.reset({
                username: userProfile?.username || "",
                fullname: userProfile?.fullname || "",
                gender: userProfile?.gender || "",
                date_of_birth: userProfile?.date_of_birth || "",
                website: userProfile?.website || "",
                bio: userProfile?.bio || "",
                designation: userProfile?.designation || "",
            });
            if (userProfile?.profile_picture) setPreview(userProfile?.profile_picture);
            if (userProfile?.background_image) setBackgroundPreview(userProfile?.background_image);

        }

    }, [userProfile, form]);



    // Detect Changes
    useEffect(() => {

        if (!userProfile) return;

        const normalizeValue = (val: any) => (val === null || val === undefined ? "" : val);

        const subscription = form.watch((values) => {

            const changed =
                normalizeValue(values.username) !== normalizeValue(userProfile.username) ||
                normalizeValue(values.fullname) !== normalizeValue(userProfile.fullname) ||
                normalizeValue(values.gender) !== normalizeValue(userProfile.gender) ||
                normalizeValue(values.date_of_birth) !== normalizeValue(userProfile.date_of_birth) ||
                normalizeValue(values.website) !== normalizeValue(userProfile.website) ||
                normalizeValue(values.bio) !== normalizeValue(userProfile.bio) ||
                normalizeValue(values.designation) !== normalizeValue(userProfile.designation) ||
                normalizeValue(preview) !== normalizeValue(userProfile.profile_picture) ||
                normalizeValue(backgroundPreview) !== normalizeValue(userProfile.background_image);

            setIsChanged(changed);

        });

        return () => subscription.unsubscribe();

    }, [form, userProfile, preview, backgroundPreview]);



    // Submit Handler
    const onSubmit = (data: ProfileFormValues) => {


        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("fullname", data.fullname);
        formData.append("gender", data.gender || "");
        formData.append("date_of_birth", data.date_of_birth || "");
        formData.append("website", data.website || "");
        formData.append("bio", data.bio || "");
        formData.append("designation", data.designation || "");

        if (data.profile_picture instanceof File) {
            formData.append("profile_picture", data.profile_picture);
        }

        if (data.background_image instanceof File) {
            formData.append("background_image", data.background_image);
        }

        editUserProfile(formData, {

            onSuccess: () => {

                form.reset();

            }

        });

    };



    return {
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
    };
};
