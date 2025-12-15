import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { UseFormReturn } from "react-hook-form";



// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
};


export default function DisplayName({ form }: Props) {

    return (

        <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm">Display Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Display name" className="py-5" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    )

}
