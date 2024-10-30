import { useForm } from 'react-hook-form';
import { z,ZodType } from 'zod';
import  { zodResolver } from '@hookform/resolvers/zod';
import { UserSignUp } from '../../types/api-types';



export const userSignUpSchema: ZodType<UserSignUp> = z.object({

    username: z.string()
    .refine((value) => value.trim() !== "", {
        message: "username cannot be empty"
    })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "username must contain alphabets only"
    }),

    email: z.string()
    .refine((value) => /^[a-z0-9._%+-]+@gmail\.com$/.test(value), {
        message: "Invalid email address",
    }),

    password: z.string()
    .min(5, { message: "password contain at least 5 characters" })
    .max(15, { message: "password cannot exceed 20 characters" })
    .regex(/[A-Z]/, {
        message: "Password contain at least one uppercase letter",
    }),

    confirmPassword: z.string()
    .min(5, "Confirm password must contain at least 5 characters"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



export const useUserSignUpForm = () => {
    const { reset, register, handleSubmit, formState: {errors} } = useForm<UserSignUp>({
        resolver: zodResolver(userSignUpSchema) 
    });
    return { register, handleSubmit, errors, reset };
};