import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY} from "rxjs";
import { Comic } from "../interfaces/comics";
import { ManglistService } from "../services/manglist.service";

export const comicResolve: ResolveFn<Comic> = (route) => {
    return inject(ManglistService)
        .getIdComic(+route.params["id"])
        .pipe(
            catchError(() => {
                inject(Router).navigate(["/manglist"]);
                return EMPTY;
            })
        );
};
