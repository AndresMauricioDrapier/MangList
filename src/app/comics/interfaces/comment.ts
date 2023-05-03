import { Auth } from "src/app/auth/interfaces/auth";


export interface Commentary {
    id?: number;
    stars: number;
    text: string;
    date?: string;
    user?: Auth;
}
