import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { UseFormReturn } from "react-hook-form";




// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
};


export default function Bio({ form }: Props) {


    return (

        <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2 relative">
                    <FormLabel className="text-sm">Bio</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Bio"
                            {...field}
                            maxLength={150}
                            className="resize-none min-h-[80px] sm:min-h-[100px] pr-12"
                        />
                    </FormControl>
                    <p className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {field.value?.length || 0}/150
                    </p>
                    <FormMessage />
                </FormItem>
            )}

        />

    )


}
