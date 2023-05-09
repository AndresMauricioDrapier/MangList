import { Routes } from "@angular/router";

export const SUBSCRIPTIONS_ROUTES: Routes = [
    {
        path: "type",
        loadComponent: () =>
            import("./subscriptions.component").then((m) => m.SubscriptionsComponent),
        // canDeactivate: [leavePageGuard],
    },
    {
      path: "cart",
      loadComponent: () =>
          import("./cart/cart.component").then((m) => m.CartComponent),
      // canDeactivate: [leavePageGuard],
  },
    { path: "**", redirectTo: "manglist/" },
];
