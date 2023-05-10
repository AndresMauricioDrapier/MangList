import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UsersService } from "../users/services/users.service";

export const roleActivateGuard: CanActivateFn = () => {
    const router = inject(Router);
    if (inject(UsersService).hasRoleToRead()) {
        return true;
    } else {
        router.navigate(["/subscriptions/type"]);
        return false;
    }
};
