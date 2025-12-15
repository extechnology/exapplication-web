import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/services/auth/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import { LoginSchema, LoginValues } from "@/schemas/authSchema";




export const useLoginForm = () => {


    // Auth context
    const { loginHandler } = useAuthContext();



    // login mutation
    const { mutate: LoginUser, isPending } = useLogin();



    // form
    const form = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues: { identifier: "", password: "" },
    });



    // submit
    const onSubmit = (values: LoginValues) => {
        const formData = new FormData();

        formData.append("identifier", values.identifier);
        formData.append("password", values.password);

        LoginUser(formData, {
            onSuccess: () => {
                form.reset();
                loginHandler(true);
            },
        });

    };


    return {
        form,
        onSubmit,
        isPending
    };


};
