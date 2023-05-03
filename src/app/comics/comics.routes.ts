import { Routes } from "@angular/router";
import { comicIdGuard } from "./guards/comicIdGuard.guard";
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
      path: ":id",
      loadComponent: () =>
          import("./comic-details/comic-details.component").then(
              (m) => m.ComicDetailsComponent
          ),
          canActivate: [comicIdGuard],
          resolve: {
            comic: comicResolve,
        },
      // canDeactivate: [leavePageGuard],
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
