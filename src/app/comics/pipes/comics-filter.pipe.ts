import { Pipe, PipeTransform, inject } from "@angular/core";
import { ComicyRanking } from "../interfaces/comics";
import { ComicsService } from "../services/comics.service";

@Pipe({
    name: "comicsFilter",
    standalone: true,
})
export class ComicsFilterPipe implements PipeTransform {
    //TODO ANDRESc
    c = inject(ComicsService);
    transform(comics: ComicyRanking[], tipo: string): ComicyRanking[] {
        if (tipo != "Filtrar") {
            const array= comics.filter((comic) => {
                 this.c.getIdComic(comic.node.id).subscribe((co) => {
                  let generoIgual = false;
                    co.genres?.filter((genre) => {
                      generoIgual = tipo == genre.name?true:generoIgual;
                    });
                });
            });
            console.log(array);
            return array;
        } else {
            return comics;
        }
    }
}
