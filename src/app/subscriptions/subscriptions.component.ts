import { Component, isDevMode } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Subscription } from "./interfaces/subscription";

@Component({
    selector: "ml-subscriptions",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./subscriptions.component.html",
    styleUrls: ["./subscriptions.component.scss"],
})
export class SubscriptionsComponent {
    basicSubscription: Subscription = {
        id: 1,
        type: "Basico",
        content: {
            acces: "limitado",
            activeUsers: 1,
        },
        price: 9.99,
    };
    standartSubscription: Subscription = {
        id: 2,
        type: "Estandard",
        content: {
            acces: "limitado",
            activeUsers: 2,
        },
        price: 14.99,
    };
    premiumSubscription: Subscription = {
        id: 3,
        type: "Premium",
        content: {
            acces: "ilimitado",
            activeUsers: 4,
        },
        price: 19.99,
    };

    goToCart(id: number) {
        alert("Ir al carrito" + id);
    }
}
