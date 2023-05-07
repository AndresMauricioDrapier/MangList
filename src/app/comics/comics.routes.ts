import { Routes } from "@angular/router";
import { comicResolve } from "./resolvers/comic.resolver";

export const MANGLIST_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./comics-page/comics-page.component").then(
                (m) => m.ComicsPageComponent
            ),
        // canDeactivate: [leavePageGuard],
    },
    {
        path: "categorias",
        loadComponent: () =>
            import("./comic-categories/comic-categories.component").then(
                (m) => m.ComicCategoriesComponent
            ),
        // resolve: {
        //     comic: comicResolve,
        // },
    },
    {
        path: "comics/:id",
        loadComponent: () =>
            import("./comic-details/comic-details.component").then(
                (m) => m.ComicDetailsComponent
            ),
        resolve: {
            comic: comicResolve,
        },
    },

    // {
    //     path: "register",
    //     loadComponent: () =>
    //         import("./auth-register/auth-register.component").then(
    //             (m) => m.AuthRegisterComponent
    //         ),
    //     canDeactivate: [leavePageGuard],
    // },
    // Doesn't match any of the above
    { path: "**", redirectTo: "manglist/" },
];
