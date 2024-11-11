
//*------------------- user form data types ------------------------


export interface UserLoginResponse {
    user: string; 
    message: string;
}
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


//*------------------- admin form data types ------------------------

export interface AdminLoginResponse {
    admin: string; 
    message: string;
}

export interface AdminLogin {
    email: string;
    password: string;
}
