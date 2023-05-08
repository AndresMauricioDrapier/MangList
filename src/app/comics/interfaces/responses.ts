import { Comic, ComicyRanking } from "./comics";
import { Commentary } from "./comment";

export interface ComicsResponse {
    ok: boolean;
    result: ComicyRanking[];
}

export interface ComicResponse {
    ok: boolean;
    result: Comic;
}
export interface CommentsResponse {
    comments: Commentary[];
}

export interface CommentResponse {
    comment: Commentary;
}
export interface searchComic {
  paging: {next:string};
  data: [{node:Comic}];
}

export interface categoriesComicResponse{
  ok:boolean,
  result:searchComic
}
