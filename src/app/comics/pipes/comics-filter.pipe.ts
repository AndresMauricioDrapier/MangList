import { Pipe, PipeTransform } from "@angular/core";
import { ComicyRanking } from "../interfaces/comics";

@Pipe({
    name: "comicsFilter",
    standalone: true,
})
export class ComicsFilterPipe implements PipeTransform {
    transform(comics: ComicyRanking[], genre: string): ComicyRanking[] {
        if (genre != "Filter" && genre) {
            const filteredComicRankings: ComicyRanking[] = [];

            for (const comicRanking of comics) {
                if (
                    comicRanking.node.genres &&
                    comicRanking.node.genres.some((g) => g.name === genre)
                ) {
                    filteredComicRankings.push(comicRanking);
                }
            }
            return filteredComicRankings;
        } else {
            return comics;
        }
    }
}
