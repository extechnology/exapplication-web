import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { UseFormReturn } from "react-hook-form";



// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
};



export default function Gender({ form }: Props) {


    return (

        <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm">Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                        <FormControl>
                            <SelectTrigger className="dark:bg-transparent py-5 text-sm w-full h-10 rounded-lg border-muted-foreground/30">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

    )

}

