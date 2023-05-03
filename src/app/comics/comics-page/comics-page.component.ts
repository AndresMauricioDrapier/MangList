import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicyRanking } from "../interfaces/comics";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "src/app/auth/interfaces/auth";
import { ComicsService } from "../services/comics.service";
import { FormsModule } from "@angular/forms";
import { ComicCardComponent } from "../comic-card/comic-card.component";
import { MenuComponent } from "src/app/shared/menu/menu.component";
import { ComicsFilterPipe } from "../pipes/comics-filter.pipe";

@Component({
    selector: "ml-comics-page",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ComicCardComponent,
        MenuComponent,
        ComicsFilterPipe,
    ],
    templateUrl: "./comics-page.component.html",
    styleUrls: ["./comics-page.component.scss"],
})
export class ComicsPageComponent implements OnInit {
    comics: ComicyRanking[] = [];
    user!: Auth;
    active = true;
    userCreated = false;
    filterSearch = "";
    @ViewChild(MenuComponent)
    set menuComponent(menu: MenuComponent) {
        this.filterSearch = menu.filterSearch;
    }

    constructor(
        private readonly comicsService: ComicsService,
        private readonly route: ActivatedRoute // private readonly httpUser: UserService
    ) {}

    ngOnInit(): void {
        this.comicsService.getComics().subscribe((comics) => {
            this.comics = comics;
            console.log(this.comics);
        });
    }
}
