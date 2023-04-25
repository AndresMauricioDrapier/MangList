import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector: "fs-menu",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
    logged?: boolean;
    constructor(
        private readonly http: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.http.loginChange$.subscribe((bol) => {
            this.logged = bol;
        });
    }

    logout(): void {
        this.http.logout();
        this.router.navigate(["auth/login"]);
    }
}
