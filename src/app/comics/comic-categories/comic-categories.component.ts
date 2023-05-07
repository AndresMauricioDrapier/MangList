import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ComicsService } from "../services/comics.service";
import { ActivatedRoute } from "@angular/router";
import { ComicCardComponent } from "../comic-card/comic-card.component";
import { Genres,Order,StartDate,Status } from "../interfaces/categories";

@Component({
    selector: "ml-comic-categories",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ComicCardComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./comic-categories.component.html",
    styleUrls: ["./comic-categories.component.scss"],
})
export class ComicCategoriesComponent {
    filterAll: FormGroup;

    genres = Genres;
    startDate = StartDate;
    status = Status;
    order = Order;


    constructor(
        private readonly comicsService: ComicsService,
        private readonly route: ActivatedRoute,
        private readonly fb: FormBuilder // private readonly httpUser: UserService
    ) {
        this.filterAll = this.fb.group({
            genres: this.genres,
            startDate: this.startDate,
            status: this.status,
            order: this.order,
        });
        this.filterAll.controls["genres"].setValue("Genero:", {
            onlySelf: true,
        });
        this.filterAll.controls["startDate"].setValue("Año:", {
            onlySelf: true,
        });
        this.filterAll.controls["status"].setValue("Estado:", {
            onlySelf: true,
        });
        this.filterAll.controls["order"].setValue("Orden:", {
            onlySelf: true,
        });
    }
}
