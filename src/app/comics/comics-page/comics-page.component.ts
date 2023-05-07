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


    generos = [
        { name: "Fantasía", value: "Fantasy" },
        { name: "Terror", value: "Horror" },
        { name: "Misterio", value: "Mystery" },
        { name: "Acción", value: "Action" },
        { name: "Sobrenatural", value: "Supernatural" },
        { name: "Artes Marciales", value: "Martial Arts" },
        { name: "Colegios y Universidad", value: "School" },
        { name: "Sheinen", value: "Seinen" },
        { name: "Aventura", value: "Adventure" },
        { name: "Comedia", value: "Comedy" },
    ];
    tipoGenero: FormGroup;

    constructor(
        private readonly comicsService: ComicsService,
        private readonly route: ActivatedRoute // private readonly httpUser: UserService
    ) {
        this.tipoGenero = new FormGroup({
            genero: new FormControl(null),
        });
        // setValue es para agregarle un valor
        this.tipoGenero.controls['genero'].setValue("Todos",
          {onlySelf: true});
    }

    ngOnInit(): void {
        //TODO ANDRES
        this.route.queryParams.subscribe((params) => {
            if (params["search"]) {
                this.comicsService
                    .getComicsString(params["search"])
                    .subscribe((comics) => {
                        this.comics = (comics as unknown as searchComic).data;
                    });
            } else {
                this.comicsService.getComics().subscribe((comics) => {
                    this.comics = comics;
                    console.log(this.comics);
                });
            }
        });
    }
}
