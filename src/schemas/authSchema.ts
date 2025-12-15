import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";



// Login Schema
export const LoginSchema = z.object({
    identifier: z.string().min(3, "Enter your email, phone number, or username")
        .refine(
            (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) return true;

                const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
                if (usernameRegex.test(value)) return true;

                return false;
            },
            {
                message: "Enter a valid email, phone number, or username",
            }
        ),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof LoginSchema>;




// Register Schema
export const RegisterSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    fullname: z.string().min(3, "Full name is too short").max(35, "Full name is too long"),
    identifier: z.string().min(5, "Enter a valid email or phone number with country code")
        .refine(
            (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailRegex?.test(value)) return true;

                const phone = parsePhoneNumberFromString(value);

                if (!phone || !phone.isValid()) return false;

                return true;
            },
            {
                message:
                    "Enter a valid email or phone number with a real country code (e.g., +91XXXXXXXXXX)",
            }
        ),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterValues = z.infer<typeof RegisterSchema>;




// Forgot Password Schema
export const ForgotPassSchema = z.object({
    identifier: z.string().min(3, "Enter your email or phone number").refine(
        (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex?.test(value)) return true;

            const phone = parsePhoneNumberFromString(value);

            if (!phone || !phone.isValid()) return false;

            return true;
        },
        {
            message:
                "Enter a valid email or phone number with a real country code (e.g., +91XXXXXXXXXX)",
        }
    ),
});

export type ForgotPassValues = z.infer<typeof ForgotPassSchema>;
