import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicyRanking } from "../interfaces/comics";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "src/app/auth/interfaces/auth";
import { ComicsService } from "../services/comics.service";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ComicCardComponent } from "../comic-card/comic-card.component";
import { MenuComponent } from "src/app/shared/menu/menu.component";
import { ComicsFilterPipe } from "../pipes/comics-filter.pipe";
import { searchComic } from "../interfaces/responses";

@Component({
    selector: "ml-comics-page",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ComicCardComponent,
        MenuComponent,
        ComicsFilterPipe,
        ReactiveFormsModule,
    ],
    providers: [{ provide: MenuComponent, useValue: {} }],
    templateUrl: "./comics-page.component.html",
    styleUrls: ["./comics-page.component.scss"],
})
export class ComicsPageComponent implements OnInit {
    comics: ComicyRanking[] = [];
    user!: Auth;
    active = true;
    userCreated = false;
    filterSearch = "sinFiltro";

    generos = [
        { name: "Filtrar", value: "Filtrar" },
        { name: "Fantasía", value: "Fantasy" },
        { name: "Terror", value: "Horror" },
        { name: "Misterio", value: "Mystery" },
        { name: "Acción", value: "Action" },
        { name: "Sobrenatural", value: "Supernatural" },
        { name: "Artes Marciales", value: "Martial Arts" },
        { name: "Colegios y Universidad", value: "School" },
        { name: "Sheinen", value: "Seinen" },
        { name: "Aventura", value: "Adventura" },
        { name: "Comedia", value: "Comedy" },
    ];
    default = { name: "Filtrar", value: "Filtrar" };

    tipoGenero: FormGroup;

    constructor(
        private readonly comicsService: ComicsService,
        private readonly route: ActivatedRoute // private readonly httpUser: UserService
    ) {
        this.tipoGenero = new FormGroup({
            genero: new FormControl(null),
        });
        // para obtenerlo necesitarias un get por ejemplo
        this.tipoGenero.get("genero");
    }

    ngOnInit(): void {
        //TODO ANDRES
        this.route.queryParams.subscribe((params) => {
            if (params["search"]) {
                this.comicsService
                    .getComicsString(params["search"])
                    .subscribe((comics) => {
                        this.comics = (comics as unknown as searchComic).data;
                        console.log(this.comics);
                    });
            } else {
                this.comicsService.getComics().subscribe((comics) => {
                    this.comics = comics;
                    console.log(this.comics);
                });
            }
        });
        console.log(this.tipoGenero);
    }

    selectFirst(genero1:{ name: string, value:string },genero2:{ name: string, value:string }){
      if (genero1==null ||genero2==null) {
        return false;
      }
      return genero1.name===genero2.name;
    }
}
