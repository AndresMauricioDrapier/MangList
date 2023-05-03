import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicyRanking } from "../interfaces/comics";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "src/app/auth/interfaces/auth";
import { ComicsService } from "../services/comics.service";
import { FormsModule } from "@angular/forms";
import { ComicCardComponent } from "../comic-card/comic-card.component";

@Component({
    selector: "ml-comics-page",
    standalone: true,
    imports: [CommonModule, FormsModule, ComicCardComponent],
    templateUrl: "./comics-page.component.html",
    styleUrls: ["./comics-page.component.scss"],
})
export class ComicsPageComponent implements OnInit {
    comics: ComicyRanking[] = [];
    user!: Auth;
    active = true;
    filterSearch = "";
    userCreated = false;
    constructor(
        private readonly comicsService: ComicsService,
        private readonly route: ActivatedRoute // private readonly httpUser: UserService
    ) {}

    ngOnInit(): void {
        this.comicsService
            .getComics()
            .subscribe((comics) => {
              this.comics = comics
              console.log(this.comics);
            });
    }
}
