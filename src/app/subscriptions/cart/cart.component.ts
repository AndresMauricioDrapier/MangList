/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subscription } from "../interfaces/subscription";

@Component({
    selector: "ml-cart",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
    subscriptions: Subscription[] = [
        {
            id: 1,
            type: "Basico",
            content: {
                acces: "limitado",
                activeUsers: 1,
            },
            price: 9.99,
            icon: "assets/Iconos/cart/icono_Basic.png",
        },
        {
            id: 2,
            type: "Estandard",
            content: {
                acces: "limitado",
                activeUsers: 2,
            },
            price: 14.99,
            icon: "assets/Iconos/cart/icono_Standart.png",
        },
        {
            id: 3,
            type: "Premium",
            content: {
                acces: "ilimitado",
                activeUsers: 4,
            },
            price: 19.99,
            icon: "assets/Iconos/cart/icono_Premium.png",
        },
    ];
    subscription!: Subscription | undefined;
    id!: string;
    exclusiveVAT!: number;
    vat!: number;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => (this.id = params["id"]));

        this.subscription = this.subscriptions.find(
            (s) => s.id.toString() === this.id
        );

        this.vat = +(this.subscription!.price * 0.21).toFixed(2);
        this.exclusiveVAT = +(this.subscription!.price - this.vat).toFixed(2);
    }

    onPurchase(): void {
        alert("¡Gracias por su compra!");
    }
}
