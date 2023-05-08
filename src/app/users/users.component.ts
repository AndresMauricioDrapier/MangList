import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicCardComponent } from "../comics/comic-card/comic-card.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Comic } from "../comics/interfaces/comics";
import { Auth } from "../auth/interfaces/auth";
import { UsersService } from "./services/users.service";

@Component({
    selector: "ml-users",
    standalone: true,
    imports: [CommonModule, ComicCardComponent],
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
    user: Auth = {
        email: "",
        avatar: "assets/utiles/icono_usuario.png",
    };
    comics!: Comic[];
    userId: string = localStorage.getItem("user-id") || "";

    isMe!: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UsersService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((user) => {
            if (user["user"]) {
                this.user = user["user"];
            } else {
                this.userService
                    .getUser(this.userId)
                    .subscribe((u) => (this.user = u));
            }
        });

        this.isMe = this.userId === this.user._id?.toString();
    }
}
