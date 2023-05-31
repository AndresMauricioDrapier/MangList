import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SlideButtonComponent } from "../../shared/slide-button/slide-button.component";
import { ActivatedRoute } from "@angular/router";
import { Auth } from "src/app/auth/interfaces/auth";
import { UsersService } from "../services/users.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { ComicsFilterPipe } from "../pipes/users-filter.pipe";

@Component({
    selector: "ml-users-page",
    standalone: true,
    templateUrl: "./users-page.component.html",
    styleUrls: ["./users-page.component.scss"],
    imports: [
        CommonModule,
        SlideButtonComponent,
        UserCardComponent,
        ComicsFilterPipe,
    ],
})
export class UsersPageComponent implements OnInit {
    users!: Auth[];
    toSearch!: string;
    haveContent = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly usersService: UsersService
    ) {}

    ngOnInit(): void {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users;
            this.mainHaveContent();
        });

        this.route.queryParams.subscribe((params) => {
            this.toSearch = params["username"];
        });
    }

    mainHaveContent() {
        setTimeout(() => {
            const userCard = document.getElementsByTagName("ml-user-card");
            this.haveContent = userCard.length > 0 ? true : false;
        }, 1000);
    }
}
