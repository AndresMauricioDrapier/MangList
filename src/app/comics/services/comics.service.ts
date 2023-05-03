import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Commentary } from "../interfaces/comment";
import {
    CommentsResponse,
    ComicResponse,
    ComicsResponse
} from "../interfaces/responses";
import { Comic, ComicyRanking } from "../interfaces/comics";

@Injectable({
    providedIn: "root",
})
export class ComicsService {
    private readonly COMIC_URL = "comics";
    constructor(private readonly http: HttpClient) {}

    getComics(): Observable<ComicyRanking[]> {
        return this.http.get<ComicsResponse>(this.COMIC_URL).pipe(
            map((r) =>{
              return  r.result;
            }),
            catchError((resp: HttpErrorResponse) =>
                throwError(
                    () =>
                        `Error getting products. Status: ${resp.status}. Message: ${resp.message}`
                )
            )
        );
    }
    getIdComic(id: number): Observable<Comic> {
        return this.http
            .get<ComicResponse>(`${this.COMIC_URL}/${id}`)
            .pipe(map((r) => {
              console.log(r);
              return r.comic;
            }));
    }
    getComments(id: number): Observable<CommentsResponse> {
        return this.http.get<CommentsResponse>(
            `${this.COMIC_URL}/${id}/comments`
        );
    }
    addComment(id: number, comment: Commentary): Observable<Commentary> {
        return this.http
            .post<Commentary>(`${this.COMIC_URL}/${id}/comments`, comment)
            .pipe(
                map((rest) => {
                    console.log(rest);

                    return rest;
                })
            );
    }
    addComic(rest: Comic, id?: number): Observable<Comic> {
        if (id) {
            return this.http
                .put<ComicResponse>(`${this.COMIC_URL}/${id}`, rest)
                .pipe(map((rest) => rest.comic));
        } else {
            return this.http
                .post<ComicResponse>(`${this.COMIC_URL}`, rest)
                .pipe(map((rest) => rest.comic));
        }
    }

    deleteRestaurant(id: number): Observable<void> {
        return this.http.delete<void>(`${this.COMIC_URL}/${id}`);
    }
}