import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY} from "rxjs";
import { Comic } from "../interfaces/comics";
import { ComicsService } from "../services/comics.service";

export const comicResolve: ResolveFn<Comic> = (route) => {
  console.log(route.params["id"]);
    return inject(ComicsService)
        .getIdComic(route.params["id"])
        .pipe(
            catchError(() => {
                inject(Router).navigate(["/"]);
                return EMPTY;
            })
        );
};
