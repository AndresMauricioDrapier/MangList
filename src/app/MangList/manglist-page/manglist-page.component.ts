import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicyRanking } from "../interfaces/comics";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "src/app/auth/interfaces/auth";
import { ManglistService } from "../services/manglist.service";
import { FormsModule } from "@angular/forms";
import { ComicCardComponent } from "../comic-card/comic-card.component";

@Component({
    selector: "ml-manglist-page",
    standalone: true,
    imports: [CommonModule, FormsModule, ComicCardComponent],
    templateUrl: "./manglist-page.component.html",
    styleUrls: ["./manglist-page.component.css"],
})
export class ManglistPageComponent implements OnInit {
    comics: ComicyRanking[] = [];
    user!: Auth;
    active = true;
    filterSearch = "";
    userCreated = false;
    constructor(
        private readonly manglistService: ManglistService,
        private readonly route: ActivatedRoute // private readonly httpUser: UserService
    ) {}

    ngOnInit(): void {
        this.manglistService
            .getComics()
            .subscribe((comic) => {

              this.comics = comic;
              console.log(this.comics);
            });
    }
}
