import { Routes } from "@angular/router";
import { userResolve } from "../users/resolvers/user.resolver";
import { leavePageGuard } from "../guards/leavePageGuard.guard";

export const SUBSCRIPTIONS_ROUTES: Routes = [
    {
        path: "type",
        loadComponent: () =>
            import("./subscriptions.component").then(
                (m) => m.SubscriptionsComponent
            ),
    },
    {
        path: "cart",
        loadComponent: () =>
            import("./cart/cart.component").then((m) => m.CartComponent),
        resolve: { user: userResolve },
        canDeactivate: [leavePageGuard],
    },
    { path: "**", redirectTo: "manglist/" },
];
