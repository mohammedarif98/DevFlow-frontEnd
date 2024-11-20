
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

export interface GoogleAuthParams {
    email: string;
    name: string;
    photo: string;
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

export type CategoryFormType = {
    categoryName: string;
    description: string;
    categoryImage: string;
}; 

export interface AddCategoryResponse {
    status: string;
    message: string;
};