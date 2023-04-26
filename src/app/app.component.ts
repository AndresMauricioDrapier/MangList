import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
export class AppComponent {
    title = "MangList";
}
