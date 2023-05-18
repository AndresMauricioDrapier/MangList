import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./shared/menu/menu.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { CookiesComponent } from "./shared/cookies/cookies.component";
import { MobileModalComponent } from "./shared/mobile-modal/mobile-modal.component";

@Component({
    selector: "ml-root",
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    imports: [CommonModule, RouterModule, MenuComponent, FooterComponent, CookiesComponent, MobileModalComponent]
})
export class AppComponent  {
    title = "MangList";
}
