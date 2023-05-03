import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Comic } from "../interfaces/comics";

@Component({
    selector: "ml-comic-details",
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: "./comic-details.component.html",
    styleUrls: ["./comic-details.component.scss"],
})
export class ComicDetailsComponent implements OnInit {
    comic!: Comic;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.comic = data["comic"];
            console.log(this.comic);
        });
    }
}
