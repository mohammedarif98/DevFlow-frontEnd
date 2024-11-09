import { z, ZodType } from "zod";
import  { zodResolver } from '@hookform/resolvers/zod';
import { AdminLogin } from "../../types/api-types";
import { useForm } from "react-hook-form";



export const AdminLoginSchema: ZodType<AdminLogin> = z.object({

    email: z.string()
    .refine((value) => /^[a-z0-9._%+-]+@gmail\.com$/.test(value), {
        message: 'Invalid email address',
    }),
    password: z.string().min(5,{ message: "Enter the Password" })
});

export const useAdminLoginForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm<AdminLogin>({resolver: zodResolver(AdminLoginSchema)});
    return { register, handleSubmit, errors }
}