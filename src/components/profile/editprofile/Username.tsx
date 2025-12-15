import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { CircleCheck, CircleX, Loader } from "lucide-react";
import { UseFormReturn } from "react-hook-form";





// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
    userUsername?: string | null;
    debounceUsername: (v: string) => void;
    setDebouncedUsername: (v: string) => void;
    usernameData?: { message?: string, is_available?: boolean } | null;
    usernameLoading?: boolean;
    usernameError?: boolean;
};



export default function Username({ form, userUsername, debounceUsername, setDebouncedUsername, usernameData, usernameLoading, usernameError }: Props) {


    return (


        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (

                <FormItem className="w-full">

                    <FormLabel className="text-sm">Username</FormLabel>

                    <div className="relative">

                        <FormControl>

                            <Input
                                {...field}
                                placeholder="username"
                                className="pr-10 mt-1 py-5"
                                onChange={(e) => {
                                    const v = e.target.value;
                                    field.onChange(v);
                                    if (!v || v === userUsername) {
                                        setDebouncedUsername("");
                                    }
                                    debounceUsername(v);
                                }}
                            />

                        </FormControl>


                        {field.value && field.value !== userUsername && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                {usernameLoading ? (
                                    <Loader className="animate-spin text-gray-400" size={20} />
                                ) : usernameData?.is_available ? (
                                    <CircleCheck className="text-green-500" size={20} />
                                ) : (
                                    <CircleX className="text-red-500" size={20} />
                                )}
                            </div>
                        )}

                    </div>


                    {form.formState.errors.username ? (
                        <FormMessage>
                            {form.formState.errors.username.message}
                        </FormMessage>
                    ) : field.value &&
                        field.value !== userUsername &&
                        usernameData &&
                        !usernameData?.is_available ? (
                        <FormMessage>
                            This username is not available. Try another one.
                        </FormMessage>
                    ) : usernameError && field.value ? (
                        <FormMessage>Couldn’t verify availability. Try again.</FormMessage>
                    ) : null}

                </FormItem>

            )}

        />


    )



}
