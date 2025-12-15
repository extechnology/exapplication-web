import { z } from "zod";

export const profileFormSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    fullname: z.string().min(3, "Display name is too short").max(35, "Display name is too long"),
    gender: z.string().optional(),
    date_of_birth: z.string().optional(),
    website: z.string().trim().optional().refine(
        (val) => !val || /^https?:\/\/.+\..+$/.test(val),
        { message: "Please enter a valid URL (e.g., https://example.com)" }
    ),
    bio: z.string().max(150, "Bio must be 150 characters or less").optional(),
    designation: z.string().optional(),
    profile_picture: z.instanceof(File).optional(),
    background_image: z.instanceof(File).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
