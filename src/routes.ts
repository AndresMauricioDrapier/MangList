import { Routes } from "@angular/router";
import { loginActivateGuard } from "./app/guards/loginActivateGuard.guard";
import { logoutActivateGuard } from "./app/guards/logoutActivateGuard.guard";

export const APP_ROUTES: Routes = [
    {
        path: "auth",
        loadChildren: () =>
            import("./app/auth/auth.routes").then((p) => p.AUTH_ROUTES),
        //canActivate: [logoutActivateGuard],
    },
    {
        path: "",
        loadChildren: () =>
            import("./app/comics/comics.routes").then((p) => p.MANGLIST_ROUTES),
    },
    // {
    //     path: "User",
    //     loadChildren: () =>
    //         import("./users/user.routes").then((p) => p.APP_ROUTES),
    //     canActivate: [loginActivateGuard],
    // },
    // Default route (empty) -> Redirect to restaurant page
    { path: "", redirectTo: "manglist/", pathMatch: "full" },
    // Doesn't match any of the above
    { path: "**", redirectTo: "manglist/" },
];
