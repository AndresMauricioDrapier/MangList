/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule, UrlTree } from "@angular/router";
import { Subscription } from "../interfaces/subscription";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Payment } from "../interfaces/payment";
import { PaymentService } from "../services/payment.service";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: "ml-cart",
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, CanDeactivateComponent {
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

    paymentForm!: FormGroup;
    nameControl!: FormControl<string>;
    cardControl!: FormControl<string>;
    expirationControl!: FormControl<string>;
    cvvControl!: FormControl<string>;
    exit = false;

    newPayment: Payment = {
        id: 0,
        name: "",
        card: "",
        expiration: "",
        cvv: "",
    };

    constructor(
        private route: ActivatedRoute,
        private readonly fb: NonNullableFormBuilder,
        private readonly paymentService: PaymentService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => (this.id = params["id"]));

        this.subscription = this.subscriptions.find(
            (s) => s.id.toString() === this.id
        );

        this.vat = +(this.subscription!.price * 0.21).toFixed(2);
        this.exclusiveVAT = +(this.subscription!.price - this.vat).toFixed(2);

        this.nameControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("[a-zA-Z ]+"),
        ]);
        this.cardControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$"),
        ]);
        this.expirationControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("/^(0[1-9]|1[0-2])?([0-9]{4}|[0-9]{2})$/"),
        ]);
        this.cvvControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("^[0-9]{3, 4}$"),
        ]);
        this.paymentForm = this.fb.group({
            name: this.nameControl,
            card: this.cardControl,
            expiration: this.expirationControl,
            cvv: this.cvvControl,
        });
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.exit || this.paymentForm.pristine) {
            return true;
        } else {
            return Swal.fire({
                title: "¿Seguro que quieres salir sin hacer el pago?",
                showDenyButton: true,
                confirmButtonText: "Seguir",
                denyButtonText: "Salir",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Cambios no guardados", "", "info");
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

    onPurchase(): void {
        this.newPayment.name = this.nameControl.value;
        this.newPayment.card = this.cardControl.value;
        this.newPayment.expiration = this.expirationControl.value;
        this.newPayment.cvv = this.cvvControl.value;

        this.paymentService.addPayment(this.newPayment).subscribe({
            next: () => {
                Swal.fire(
                    "¡Pago realizado!",
                    "¡Ya puedes disfrutar de tu suscripción!",
                    "success"
                );
                this.exit = true;
            },
            error: () => {
                Swal.fire(
                    "¡Error!",
                    "No se ha podido realizar el pago",
                    "error"
                );
            },
        });
    }

    validClasses(
        ngModel: FormControl,
        validClass = "is-valid",
        errorClass = "is-invalid"
    ): object {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid,
        };
    }
}
