import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Payment } from "../interfaces/payment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    addPayment(payment: Payment): Observable<void> {
        return this.http.post<void>("subscription/cart/payment", payment);
    }
}
