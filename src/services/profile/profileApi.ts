import { CommonApi } from "@/lib/CommonApi";




// Get User Profile Details
export const GetUserProfileApi = async () => {

    return await CommonApi("GET", "/user/profile/");

}




// Get friends Profile Details
export const GetProfileApi = async (username: string) => {

    const params = new URLSearchParams({ username });

    return await CommonApi("GET", `/user/profile/?${params.toString()}`);

}




// Edit User Profile Details
export const EditUserProfileApi = async (profileData: FormData) => {

    return await CommonApi("PATCH", "/user/profile/patch/", profileData);

}




// Get Professional Title
export const GetProfessionalTitleApi = async (search: string) => {

    const params = new URLSearchParams({ q: search });

    return await CommonApi("GET", `/external/list-professional-titles/?${params.toString()}`);

}