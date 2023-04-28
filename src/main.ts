import { AppComponent } from "./app/app.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { baseUrlInterceptor } from "./app/interceptors/base-url.interceptor";
import { provideGoogleId } from "./app/auth/auth-login/google-login/google-login.config";
import { tokenInterceptor } from "./app/interceptors/token.interceptor";
import { APP_ROUTES } from "./routes";
import { UserInterceptor } from "./app/interceptors/user.interceptor";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([baseUrlInterceptor, tokenInterceptor, UserInterceptor])
        ),
        provideRouter(APP_ROUTES),
        provideGoogleId(
            "746820501392-nc4pet9ffnm8gq8hg005re9e6ho65nua.apps.googleusercontent.com"
        )
    ],
});
