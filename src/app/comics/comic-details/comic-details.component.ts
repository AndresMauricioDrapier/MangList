import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { Comic } from "../interfaces/comics";
import { CommentsComponent } from "../comments/comments.component";
import { Auth } from "src/app/auth/interfaces/auth";
import { UsersService } from "src/app/users/services/users.service";
import { CreateCommentComponent } from "../comments/create-comment/create-comment.component";
import { TranslateService } from "../services/translate.service";
import Swal from "sweetalert2";
import { Commentary } from "../interfaces/comment";
import { ComicsService } from "../services/comics.service";
import { Genres } from "../interfaces/const";

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
    comment: Commentary;
    inFav = false;
    haveRoleToEditComic!: boolean;
    comicId: string;
    translatedGenres!: { name: string; value: string }[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private readonly translateService: TranslateService,
        private readonly comicsService: ComicsService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.comic = data["comic"];
            this.comicId = this.comic.id
                ? this.comic.id.toString()
                : this.comic._id;
        });

        if (this.comic && localStorage.getItem("user-id")) {
            this.usersService
                .getUser(localStorage.getItem("user-id")!)
                .subscribe((user) => {
                    this.user = user;
                    this.containsFavorite();
                });
        }

        this.usersService.hasRoleToAdd().subscribe((bool) => {
            this.haveRoleToEditComic = bool;
        });
        this.comic.synopsis = this.comic.synopsis.substring(
            0,
            this.comic.synopsis.length - 24
        );

        this.translateService
            .translate(this.comic.synopsis)
            .then(
                (r) => (this.comic.synopsis = r.data[0].translations[0].text)
            );

        this.comic.start_date = this.formatDate(this.comic.start_date);

        this.translatedGenres = this.setGenres();
    }

    addComment(comment: Commentary) {
        this.comment = comment;
    }

    addToFavorites(): void {
        this.usersService.addFavorites(this.comicId, this.user._id).subscribe({
            next: () => {
                this.inFav = true;
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
        this.usersService
            .deleteFavorite(this.comicId, this.user._id)
            .subscribe({
                next: () => {
                    this.inFav = false;
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

    containsFavorite(): void {
        let boolean = false;
        this.user.favorites?.map((r) =>
            r.toString() === this.comicId ? (boolean = true) : boolean
        );
        this.inFav = boolean;
    }

    goToReadingPage(): void {
        if (this.usersService.isLogged()) {
            if (this.user.role !== "user" && this.user.role !== "api") {
                this.router.navigate(["/comics", this.comicId, "reading"]);
            } else {
                this.router.navigate(["/subscriptions/type"]);
            }
        } else {
            this.router.navigate(["/auth/login"]);
        }
    }

    savelastComicRead() {
        this.usersService
            .saveLastComicRead(this.user._id, this.comicId)
            .subscribe({
                next: () => {
                    this.goToReadingPage();
                },
                error: (e) => console.error(e),
            });
    }

    deleteComic(): void {
        Swal.fire({
            title: "¿Seguro que quieres borrar el comic?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: "Cerrar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.comicsService.deleteComic(this.comicId).subscribe({
                    next: () => {
                        Swal.fire({
                            title: "Comic borrado correctamente",
                            icon: "success",
                        });
                        this.router.navigate(["/"]);
                    },
                    error: (err) => {
                        Swal.fire({
                            title: "El comic no se ha borrado correctamente",
                            text: err,
                            icon: "error",
                        });
                    },
                });
                return true;
            } else {
                Swal.fire({
                    title: "Comic no se ha borrado",
                    icon: "error",
                });
                return false;
            }
        });
    }

    setGenres() {
        const genresConst = Genres;

        const filteredGenres = [];
        for (let i = 0; i < this.comic.genres.length; i++) {
            genresConst.filter((e) => {
                if (e.value === this.comic.genres[i].name) {
                    filteredGenres.push(e);
                }
            });
        }
        return filteredGenres;
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

    goToEditComic(): void {
        this.router.navigate(["/comics/add"], {
            queryParams: { comicId: this.comic._id },
        });
    }

    busquedaFiltro(genre) {
        this.router.navigate(["/categorias"], {
            queryParams: { filter: genre },
        });
    }
}
