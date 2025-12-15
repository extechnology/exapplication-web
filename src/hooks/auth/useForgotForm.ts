import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "@/services/auth/useAuth";
import { toast } from "sonner";
import { ForgotPassSchema, ForgotPassValues } from "@/schemas/authSchema";




export const useForgotForm = () => {


    // Forgot OTP modal state
    const [isOpen, setIsOpen] = useState<boolean>(false);


    // Otp verified 
    const [isVerified, setIsVerified] = useState<boolean>(true);


    // Forgot password mutation
    const { mutate: Forgotpassword, isPending } = useForgotPassword();


    // form
    const form = useForm<ForgotPassValues>({
        resolver: zodResolver(ForgotPassSchema),
        mode: "onChange",
        defaultValues: { identifier: "" },
    });

    
    // submit
    const onSubmit = (values: ForgotPassValues) => {
        const formData = new FormData();

        formData.append("identifier", values.identifier);

        Forgotpassword(formData, {
            onSuccess: () => {
                toast.success("OTP Sent!", { description: `An OTP has been sent to ${values.identifier}.`, duration: 7000 });
                setIsOpen(true);
            },
        });
    };


    return {
        form,
        onSubmit,
        isOpen,
        setIsOpen,
        isVerified,
        setIsVerified,
        isPending
    };

    
};
