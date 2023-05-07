import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComicCardComponent } from "../comics/comic-card/comic-card.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Comic } from "../comics/interfaces/comics";
import { Auth } from "../auth/interfaces/auth";

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

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // this.route.data.subscribe((data) => {
        //     this.user = data["user"];
        // });
    }
}
