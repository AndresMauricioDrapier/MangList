import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Comic } from "../interfaces/comics";
import { CommentsComponent } from "../comments/comments.component";
import { Auth } from "src/app/auth/interfaces/auth";
import { UsersService } from "src/app/users/services/users.service";
import { CreateCommentComponent } from "../comments/create-comment/create-comment.component";
import { TranslateService } from "../services/translate.service";
import Swal from "sweetalert2";

@Component({
    selector: "ml-comic-details",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CommentsComponent,
        CreateCommentComponent,
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
        private UsersService: UsersService,
        private readonly translateService: TranslateService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.comic = data["comic"];
        });

        if (this.comic && localStorage.getItem("user-id")) {
            this.UsersService.getUser(
                localStorage.getItem("user-id")!
            ).subscribe((user) => {
                this.user = user;
                console.log(user._id);
            });
        }

        this.translateService
            .translate(this.comic.synopsis)
            .then(
                (r) => (this.comic.synopsis = r.data[0].translations[0].text)
            );

        this.comic.start_date = this.formatDate(this.comic.start_date);
    }

    addToFavorites(): void {
        this.UsersService.addFavorites(this.comic.id, this.user._id).subscribe({
            next: () => {
                Swal.fire({
                    icon: "success",
                    title: "¡Comic añadido a favoritos!",
                });
            },
            error: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Comic no añadido a favoritos",
                });
            },
        });
    }

    deleteFronFavorites(): void {
        this.UsersService.deleteFavorite(
            this.comic.id,
            this.user._id
        ).subscribe({
            next: () => {
                Swal.fire({
                    icon: "success",
                    title: "¡Comic eliminado de favoritos!",
                });
            },
            error: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Comic no eliminado de favoritos",
                });
            },
        });
    }

    containsFavorite(): boolean {
        let boolean = false;
        this.user.favorites?.map((r) =>
            r === this.comic.id ? (boolean = true) : boolean
        );
        return boolean;
    }

    goToReadingPage(): void {
        if (this.UsersService.isLogged()) {
            if (this.user.role !== "user" && this.user.role !== "api") {
                this.router.navigate(["/comics", this.comic.id, "reading"]);
            } else {
                this.router.navigate(["/subscriptions/type"]);
            }
        } else {
            this.router.navigate(["/auth/login"]);
        }
    }

    formatDate(fecha: string): string {
        const date = new Date(fecha);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (
            (day < 10 ? "0" + day : day) +
            "/" +
            (month < 10 ? "0" + month : month) +
            "/" +
            year
        );
    }
}
