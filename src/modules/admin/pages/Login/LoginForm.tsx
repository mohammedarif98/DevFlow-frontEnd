import React from "react";
import { AdminLogin } from "../../../../utils/types/api-types";

interface LoginFormProps {
    register: any;
    errors: any;
    handleSubmit: any;
    handleLogin: (data: AdminLogin) => void;
    errorMessage?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
    register,
    errors,
    handleSubmit,
    handleLogin,
    errorMessage,
}) => (
    <form className="w-3/4" onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-y-2">
            <p className="text-2xl tracking-[0.1em] font-semibold text-white uppercase font-arsenal-sc-regular text-center">
                Welcome
            </p>
            <p className="text-white text-center mb-6 text-xl font-arsenal-sc-regular">
                Please Login to Admin Dashboard
            </p>
        </div>

        <div className="mb-4">
            <input
                type="email"
                id="email"
                {...register('email')}
                className="px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0 w-full"
                placeholder="Enter your email"
                value={"admin@gmail.com"}
                required
            />
            {errors.email && (
                <span className="text-sm font-normal text-rose-600">
                    {errors.email.message}
                </span>
            )}
        </div>

        <div className="mb-2">
            <input
                type="password"
                id="password"
                {...register('password')}
                className="px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0 w-full"
                placeholder="Enter your password"
                value={"admin123"}
                required
            />
            {errors.password && (
                <span className="text-sm font-normal text-rose-600">
                    {errors.password.message}
                </span>
            )}
            {errorMessage && (
                <span className="text-sm font-normal text-rose-600">{errorMessage}</span>
            )}
        </div>

        <div className="flex justify-end mb-6">
            <p className="text-white text-sm">Forgot the Password ?</p>
        </div>

        <button
            type="submit"
            className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 w-full rounded-sm"
        >
            Login
        </button>
    </form>
);

export default LoginForm;