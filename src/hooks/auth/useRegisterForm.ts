import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister, useCheckIndentifier, usecheckUsername } from "@/services/auth/useAuth";
import { useDebounce } from "../useDebounce";
import { toast } from "sonner";
import { RegisterSchema, RegisterValues } from "@/schemas/authSchema";




export const useRegisterForm = () => {



    // Register OTP modal state
    const [isOpen, setIsOpen] = useState<boolean>(false);


    // register mutation
    const { mutate: RegisterUser, isPending } = useRegister();



    // Debounced state
    const [debouncedUsername, setDebouncedUsername] = useState("");
    const [debouncedIdentifier, setDebouncedIdentifier] = useState("");



    // Debounce handlers
    const debounceUsername = useCallback(useDebounce((val: string) => setDebouncedUsername(val), 500), []);
    const debounceIdentifier = useCallback(useDebounce((val: string) => setDebouncedIdentifier(val), 500), []);



    // Use React Query hooks
    const { data: usernameData, isFetching: usernameLoading, isError: usernameError } = usecheckUsername(debouncedUsername);
    const { data: IndentifierData, isFetching: IdentifierLoading, isError: IdentifierError } = useCheckIndentifier(debouncedIdentifier);




    // form
    const form = useForm<RegisterValues>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
        defaultValues: { username: "", fullname: "", identifier: "", password: "" },
    });




    // Handle request for Register OTP
    const onSubmit = (data: RegisterValues) => {

        const formdata = new FormData();

        formdata.append("identifier", data.identifier);
        formdata.append("fullname", data.fullname);
        formdata.append("username", data.username);
        formdata.append("password", data.password);

        RegisterUser(formdata, {
            onSuccess: () => {
                toast.success("Registration Successful!", {
                    description: `An OTP has been sent to ${data.identifier}.`,
                    duration: 7000,
                });

                setIsOpen(true);
            },
        });

    };




    return {
        form,
        onSubmit,
        isOpen,
        setIsOpen,
        isPending,
        usernameData,
        usernameLoading,
        usernameError,
        IndentifierData,
        IdentifierLoading,
        IdentifierError,
        debounceUsername,
        debounceIdentifier
    };

    
};
