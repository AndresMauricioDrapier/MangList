import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector: "ml-footer",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {}
