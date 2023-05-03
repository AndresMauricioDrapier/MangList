import { Pipe, PipeTransform } from "@angular/core";
import { ComicyRanking } from "../interfaces/comics";

@Pipe({
    name: "comicsFilter",
    standalone: true,
})
export class ComicsFilterPipe implements PipeTransform {
    transform(comics: ComicyRanking[], search: string, tipo?: string): ComicyRanking[] {
        return comics.filter((comic) => {
            if (tipo) {
                comic.node.genres?.forEach((genero) => {
                    return (tipo == genero.name && comic.node.title.toLowerCase().includes(search));
                });
                return;
            }else{
              return comic.node.title.toLowerCase().includes(search);
            }
        });
    }
}
