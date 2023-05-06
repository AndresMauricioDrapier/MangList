import { Pipe, PipeTransform, inject } from "@angular/core";
import { ComicyRanking } from "../interfaces/comics";
import { ComicsService } from "../services/comics.service";
import { Comic } from "../interfaces/comics";

@Pipe({
    name: "comicsFilter",
    standalone: true,
})
export class ComicsFilterPipe implements PipeTransform {
    service =inject(ComicsService);
    transform(comics: ComicyRanking[], genero: string): ComicyRanking[] {
        if (genero != "Filtrar" && genero) {
            const filteredComicRankings: ComicyRanking[] = [];

            for (const comicRanking of comics) {

                this.getComics(comicRanking.node.id).subscribe(
                    (comic: Comic) => {
                      console.log(comic);
                        if (
                            comic.genres &&
                            comic.genres.some((g) => g.name === genero)
                        ) {
                            filteredComicRankings.push(comicRanking);
                        }
                    }
                );
            }
            return filteredComicRankings;
        } else {
            return comics;
        }
    }
    private getComics(id: number) {
        return this.service.getIdComic(id);
    }
}
