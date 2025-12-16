import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ProfileFormValues } from "@/schemas/profileSchema";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";



// Props Type
type Props = {
    form: UseFormReturn<ProfileFormValues>;
};


export default function DateOfBirth({ form }: Props) {


    // State for date picker
    const [open, setOpen] = useState<boolean>(false);
    

    return (


        <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {



                const formatDate = (date: Date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    return `${year}-${month}-${day}`;
                };

                return (

                    <FormItem className="flex flex-col">

                        <FormLabel className="text-sm">Date of Birth</FormLabel>

                        <Popover open={open} onOpenChange={setOpen}>

                            <PopoverTrigger asChild>
                                <Button
                                    className={cn(
                                        "w-full py-5 bg-transparent hover:bg-accent border justify-start text-left font-normal h-10 rounded-lg border-muted-foreground/30 text-white",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent align="start" className="p-2 w-auto">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            const formatted = formatDate(date);
                                            field.onChange(formatted);
                                        }
                                        setOpen(false);
                                    }}
                                    disabled={(date: Date) => date > new Date()}
                                    captionLayout="dropdown"
                                    toYear={new Date().getFullYear()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <FormMessage />

                    </FormItem>
                );
            }}
        />

    )
}
