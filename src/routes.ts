import { Routes } from "@angular/router";
import { loginActivateGuard } from "./app/guards/loginActivateGuard.guard";
import { logoutActivateGuard } from "./app/guards/logoutActivateGuard.guard";

export const APP_ROUTES: Routes = [
    {
        path: "auth",
        loadChildren: () =>
            import("./app/auth/auth.routes").then((p) => p.APP_ROUTES),
        //canActivate: [logoutActivateGuard],
    },
    // {
    //     path: "MangList",
    //     loadChildren: () =>
    //         import("./restaurants/Restaurant.routes").then((p) => p.APP_ROUTES),
    //     canActivate: [loginActivateGuard],
    // },
    // {
    //     path: "User",
    //     loadChildren: () =>
    //         import("./users/user.routes").then((p) => p.APP_ROUTES),
    //     canActivate: [loginActivateGuard],
    // },
    // Default route (empty) -> Redirect to restaurant page
    { path: "", redirectTo: "auth/login", pathMatch: "full" },
    // Doesn't match any of the above
    { path: "**", redirectTo: "auth/login" },
];
