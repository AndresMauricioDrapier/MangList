import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { Auth } from "src/app/auth/interfaces/auth";
import { AuthResponse } from "src/app/auth/interfaces/responses";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    private readonly USERS_URL = "users";
    constructor(private readonly http: HttpClient) {}

    getUser(id: string): Observable<Auth> {
        return this.http.get<AuthResponse>(`${this.USERS_URL}/${id}`).pipe(
            map((r) => {
                return r.result;
            }),
            catchError((resp: HttpErrorResponse) =>
                throwError(
                    () =>
                        `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
                )
            )
        );
    }

    saveProfile(name: string, email: string): Observable<void> {
        return this.http.put<void>(this.USERS_URL + "/me", { name, email });
    }

    saveAvatar(avatar: string): Observable<string> {
        return this.http.put<string>(this.USERS_URL + "/me/avatar", {
            avatar,
        });
    }

    savePassword(password: string): Observable<void> {
        return this.http.put<void>(this.USERS_URL + "/me/password", {
            password,
        });
    }

    addFavorites(idComic: number, idUser: number): Observable<void> {
        return this.http.put<void>(
            this.USERS_URL + "/" + idUser + "/favorites",
            { idComic }
        );
    }
}
