import { Pipe, PipeTransform } from "@angular/core";
import { ComicyRanking } from "../interfaces/comics";

@Pipe({
    name: "comicsFilter",
    standalone: true,
})
export class ComicsFilterPipe implements PipeTransform {
    //TODO ANDRES
    transform(comics: ComicyRanking[], tipo: string): ComicyRanking[] {
        return comics.filter((comic) => {
            if (tipo) {
                comic.node?.genres?.forEach((genero) => {
                    return tipo == genero.name;
                });
                return;
            }
        });
    }
}
