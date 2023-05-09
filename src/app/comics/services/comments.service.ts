import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Commentary } from "../interfaces/comment";
import { CommentsResponse } from "../interfaces/responses";

@Injectable({
    providedIn: "root",
})
export class CommentsService {
    private readonly COMIC_URL = "comments";
    constructor(private readonly http: HttpClient) {}

    getComments(id: number): Observable<CommentsResponse> {
        return this.http.get<CommentsResponse>(
            `${this.COMIC_URL}/comic/${id}`
        );
    }
    getAllComments(): Observable<CommentsResponse> {
      return this.http.get<CommentsResponse>(
          `${this.COMIC_URL}`
      );
  }
    addComment(comment: Commentary): Observable<Commentary> {
        return this.http
            .post<Commentary>(`${this.COMIC_URL}`, comment)
            .pipe(
                map((rest) => {
                    console.log(rest);
                    return rest;
                })
            );
    }
}
