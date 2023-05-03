import { Comic, ComicyRanking } from "./comics";
import { Commentary } from "./comment";


export interface ComicsResponse {
  ok: boolean;
  result: ComicyRanking[];
}

export interface ComicResponse {
    comic: Comic;
}
export interface CommentsResponse {
    comments: Commentary[];
}

export interface CommentResponse {
    comment: Commentary;
}
