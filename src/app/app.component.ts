import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { isMobile } from "./shared/validators/isMobile";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./shared/menu/menu.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
    selector: "ml-root",
    standalone: true,
    imports: [CommonModule, RouterModule, MenuComponent, FooterComponent],
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "MangList";
    isMobile!: boolean;

    ngOnInit(): void {
        this.isMobile = isMobile();
    }

    closeModal(): void {
        const modal = document.getElementById("modal")!;
        modal.style.display = "none";
    }
}
