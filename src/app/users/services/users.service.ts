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

    userId = localStorage.getItem("user-id") || "";

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

    // getUserImage(imageName: string): Observable<string> {
    //     return this.http
    //         .get<string>(`${this.USERS_URL}/images/${imageName}`)
    //         .pipe(
    //             map((r) => {
    //                 return r;
    //             }),
    //             catchError((resp: HttpErrorResponse) =>
    //                 throwError(
    //                     () =>
    //                         `Error getting user. Status: ${resp.status}. Message: ${resp.message}`
    //                 )
    //             )
    //         );
    // }

    saveProfile(name: string, email: string): Observable<void> {
        return this.http.put<void>(this.USERS_URL + "/user/" + this.userId, {
            name,
            email,
        });
    }

    saveAvatar(
        avatar: string,
        name: string,
        avatarAntigua: string
    ): Observable<string> {
        return this.http.put<string>(
            this.USERS_URL + "/avatar/" + this.userId,
            {
                avatar,
                name,
                avatarAntigua,
            }
        );
    }

    savePassword(
        firstPassword: string,
        secondPassword: string
    ): Observable<void> {
        return this.http.put<void>(
            this.USERS_URL + "/password/" + this.userId,
            {
                firstPassword,
                secondPassword,
            }
        );
    }

    addFavorites(idComic: number, idUser: number): Observable<void> {
        return this.http.put<void>(this.USERS_URL + "/favorites/" + idUser, {
            idComic,
        });
    }

    deleteFavorite(idComic: number, idUser: number): Observable<void> {
      return this.http.put<void>(this.USERS_URL + "/favorites/delete/" + idUser, {
        idComic,
    });
    }

    isLogged(): boolean {
        return localStorage.getItem("auth-token") ? true : false;
    }

    hasRoleToRead(): boolean {
        this.getUser(this.userId).subscribe((user) => {
            if (user.role === "admin" || user.role === "subscribed") {
                return true;
            }
            return false;
        });
        return false;
    }
}
