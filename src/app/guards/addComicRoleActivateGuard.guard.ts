import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UsersService } from "../users/services/users.service";

export const addComicRoleActivateGuard: CanActivateFn = () => {
    const router = inject(Router);
    if (inject(UsersService).hasRoleToAdd()) {
        return true;
    } else {
        router.navigate(["/"]);
        return false;
    }
};
