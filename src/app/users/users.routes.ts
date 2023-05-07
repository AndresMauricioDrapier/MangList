import { Routes } from "@angular/router";
import { userResolve } from "./resolvers/user.resolver";

export const USER_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./users.component").then((m) => m.UsersComponent),
        // canDeactivate: [leavePageGuard],
    },
    // {
    //     path: "/:id",
    //     loadComponent: () =>
    //         import("./users.component").then((m) => m.UsersComponent),
    //     resolve: {
    //         comic: userResolve,
    //     },
    //     // canActivate: [comicIdGuard],
    //     // canDeactivate: [leavePageGuard],
    // },
    { path: "**", redirectTo: "manglist/" },
];
