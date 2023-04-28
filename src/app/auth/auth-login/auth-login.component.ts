import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GoogleLoginDirective } from "./google-login/google-login.directive";
import { AuthService } from "../services/auth.service";
import { AuthLogin } from "../interfaces/auth";
import Swal from "sweetalert2";

@Component({
    selector: "ml-auth-login",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        GoogleLoginDirective,
        ReactiveFormsModule,
    ],
    templateUrl: "./auth-login.component.html",
    styleUrls: ["./auth-login.component.scss"],
})
export class AuthLoginComponent implements OnInit {
    userForm!: FormGroup;
    emailControl!: FormControl<string>;
    passwordControl!: FormControl<string>;
    googleIcon = faGoogle;

    userInfo: AuthLogin = {
        email: "",
        password: "",
        token: "",
        userId: "",
    };

    constructor(
        private readonly router: Router,
        private readonly http: AuthService,
        private readonly fb: NonNullableFormBuilder
    ) {}

    ngOnInit(): void {
        this.emailControl = this.fb.control("", [
            Validators.required,
            Validators.email,
        ]);
        this.passwordControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("^.{4,}$"),
        ]);
        this.userForm = this.fb.group({
            email: this.emailControl,
            password: this.passwordControl,
        });
    }

    validClasses(
        ngModel: FormControl,
        validClass = "is-valid",
        errorClass = "is-invalid"
    ): object {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid,
        };
    }

    loggedGoogle(user: gapi.auth2.GoogleUser): void {
        this.userInfo.token = user.getAuthResponse().id_token;
        console.log(this.userInfo, user.getAuthResponse().id_token);

        this.http.loginGoogle(this.userInfo).subscribe({
            next: () => this.router.navigate(["/restaurants"]),
        });
    }


    loggin(): void {
        this.userInfo.email = this.userForm.controls["email"].value;
        this.userInfo.password = this.userForm.controls["password"].value;
        this.http.login(this.userInfo).subscribe({
            next: () => {
                this.router.navigate(["/auth/register"]);
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.error.message,
                });
            },
        });
    }
    goRegister(): void {
        this.router.navigate(["auth/register"]);
    }
}
