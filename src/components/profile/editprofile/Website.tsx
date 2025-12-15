import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { UseFormReturn } from "react-hook-form";



// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
};



export default function Website({ form }: Props) {


    return (


        <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm">Website</FormLabel>
                    <FormControl>
                        <Input type="url" className="py-5" placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />


    )


}
