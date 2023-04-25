export interface Auth {
    id?: number;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    lat: number;
    lng: number;
    me?: boolean;
    token?:string;
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

