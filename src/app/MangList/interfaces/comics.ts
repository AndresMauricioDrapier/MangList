import { Auth } from "src/app/auth/interfaces/auth";

export interface Comic {
    id?: number;
    title: string;
    main_picture?:{medium:string,large:string};
    // description: string;
    // cuisine: string;
    // daysOpen: string[];
    // image: string;
    // phone: string;
    // creator?: Auth;
    // mine?: boolean;
    // distance?: number;
    // commented?: boolean;
    // stars?: number;
    // address: string;
    // lat: number;
    // lng: number;
}
export interface Ranking{
  rank:number;
}

export interface ComicyRanking{
  node: Comic;
  ranking: Ranking
}
