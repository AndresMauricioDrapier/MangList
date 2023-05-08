import { Routes } from "@angular/router";
import { userResolve } from "./resolvers/user.resolver";
import { leavePageGuard } from "../guards/leavePageGuard.guard";

export const USER_ROUTES: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./users.component").then((m) => m.UsersComponent),
        // canDeactivate: [leavePageGuard],
    },
    {
      path: 'me',
      loadComponent: () =>
        import('./users.component').then(
          (m) => m.UsersComponent
        ),
    },
    {
      path: ':id',
      loadComponent: () =>
        import('./users.component').then(
          (m) => m.UsersComponent
        ),
      canDeactivate: [leavePageGuard],
      resolve: { user: userResolve },
    },
    { path: "**", redirectTo: "manglist/" },
];
