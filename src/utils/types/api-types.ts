
//*------------------- form data types ------------------------

export interface UserSignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLogin {
    email: string;
    password: string;
}