import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Comic } from "../interfaces/comics";
import { CommentsComponent } from "../comments/comments.component";
import { Auth } from "src/app/auth/interfaces/auth";
import { UsersService } from "src/app/users/services/users.service";

@Component({
    selector: "ml-comic-details",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CommentsComponent,
    ],
    templateUrl: "./comic-details.component.html",
    styleUrls: ["./comic-details.component.scss"],
})
export class ComicDetailsComponent implements OnInit {
    comic!: Comic;
    user!: Auth;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private readonly fb: NonNullableFormBuilder,
        private UsersService: UsersService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.comic = data["comic"];
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.UsersService.getUser(localStorage.getItem("user-id")!).subscribe(
            (user) => {
                this.user = user;
            }
        );
    }

    //TODO Néstor: Implementar el método addToFavorites y containsFavorite correctamente
    addToFavorites(idComic: number): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.UsersService.addFavorites(idComic, this.user._id!).subscribe();
    }

    containsFavorite(): boolean {
        let boolean = false;
        this.user.favorites?.map((r) =>
            r === this.comic.id ? (boolean = true) : boolean
        );
        return boolean;
    }
}
