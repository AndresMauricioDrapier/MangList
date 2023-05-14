import { Auth } from "src/app/auth/interfaces/auth";

export interface Commentary {
    _id?: number;
    user: Auth;
    comicId: number;
    text: string;
    stars: number;
    date?: string;
}
