import { z, ZodType } from "zod";
import  { zodResolver } from '@hookform/resolvers/zod';
import { UserLogin } from "../../types/api-types";
import { useForm } from "react-hook-form";



export const userLoginSchema: ZodType<UserLogin> = z.object({

    email: z.string()
    .refine((value) => /^[a-z0-9._%+-]+@gmail\.com$/.test(value), {
        message: "Invalid email address",
    }),
    password: z.string().min(5,{ message: "Enter the Password"})

});


export const useUserLoginForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm<UserLogin>({resolver: zodResolver(userLoginSchema)});
    return { register, handleSubmit, errors}
}