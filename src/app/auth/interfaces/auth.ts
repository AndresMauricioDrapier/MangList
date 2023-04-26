export interface Auth {
    id?: number;
    name?: string;
    email: string;
    password?: string;
    avatar?: string;
    token?:string;
    role?:string;
}

export interface AuthLogin {
    email: string;
    password: string;
    lat?: number;
    lng?: number;
    token?:string;
    image?:string;
    userId?:string;
}

