import { Pipe, PipeTransform, inject } from "@angular/core";
import { ComicyRanking, Ranking } from "../interfaces/comics";
import { ComicsService } from "../services/comics.service";
import { Comic } from "../interfaces/comics";

@Pipe({
    name: "comicsFilterCategory",
    standalone: true,
})
export class ComicsFilterCategoryPipe implements PipeTransform {

    transform(comics: ComicyRanking[], genres?: string,status?:string,year?:string,order?:string): ComicyRanking[] {

      console.log(genres,status,order,year);
      //Filtrar por los comics segun lo que se reciba
      const comicsFiltrados = comics.filter((comicRanking: ComicyRanking) => {
        const comic: Comic = comicRanking.node;
        const ranking: Ranking | undefined = comicRanking.ranking;
        return (!genres || comic.genres?.some(genero=>genero.name===genres)) && (!status || comic.status === status) &&
          (!year || comic.start_date?.includes(year)) && ranking;
      });

      if(order)
      {
        comicsFiltrados.sort((comicA:ComicyRanking,comicB:ComicyRanking)=>{
          let a:any,b:any;
          if(order==="means"){
            a=comicA.node.mean;
            b=comicB.node.mean;
          }else if(order==="alphabetically"){
            a=comicA.node.title;
            b=comicB.node.title;
          }else if(order==="startDate"){
            a=comicA.node.mean;
            b=comicB.node.mean;
          }else if(order==="status"){
            a=comicA.node.mean;
            b=comicB.node.mean;
          }
          return a<b?-1:a>b?1:0;
        })
      }
      return comicsFiltrados;


    }
}
