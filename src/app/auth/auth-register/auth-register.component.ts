import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Router, RouterModule, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Auth } from "../interfaces/auth";
import { isTheSame } from "src/app/shared/validators/isTheSame";
import { AuthService } from "../services/auth.service";
import Swal from "sweetalert2";
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";

@Component({
    selector: "ml-auth-register",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ImageCropperModule,
    ],
    templateUrl: "./auth-register.component.html",
    styleUrls: ["./auth-register.component.scss"],
})
export class AuthRegisterComponent implements OnInit, CanDeactivateComponent {
    userForm!: FormGroup;
    nameControl!: FormControl<string>;
    emailControl!: FormControl<string>;
    passwordControl!: FormControl<string>;
    password2Control!: FormControl<string>;
    imageControl!: FormControl<string>;
    exit = false;

    imageChangedEvent: any = "";
    croppedImage: any = "";

    newUser: Auth = {
        name: "",
        email: "",
        avatar: "",
    };

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly fb: NonNullableFormBuilder
    ) {}
    ngOnInit(): void {
        this.nameControl = this.fb.control("", [
            Validators.required,
            Validators.pattern("[a-zA-Z ]+"),
        ]);
        this.emailControl = this.fb.control("", [
            Validators.required,
            Validators.email,
        ]);

        this.passwordControl = this.fb.control("", [
            Validators.required,
            Validators.pattern(
                "^(?=.*[!@#$%&/.()=+?\\[\\]~\\-^0-9])[a-zA-Z0-9!@#$%&./()=+?\\[\\]~\\-^]{8,}$"
            ),
        ]);
        this.password2Control = this.fb.control("", [
            Validators.required,
            isTheSame(this.passwordControl),
        ]);
        this.imageControl = this.fb.control("", [Validators.required]);
        this.userForm = this.fb.group({
            name: this.nameControl,
            email: this.emailControl,
            password: this.passwordControl,
            password2: this.password2Control,
            avatar: this.imageControl,
        });
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.exit || this.userForm.pristine) {
            return true;
        } else {
            return Swal.fire({
                title: "Do you want to leave this page?",
                showDenyButton: true,
                confirmButtonText: "Exit",
                denyButtonText: "Don't exit",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Changes have not been saved", "", "info");
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    addUser(): void {
        this.newUser.name = this.nameControl.value;
        this.newUser.email = this.emailControl.value;
        this.newUser.password = this.passwordControl.value;
        this.newUser.role = "user";
        // this.newUser.avatar = "assets/utiles/icono_usuario.png";

        this.authService.register(this.newUser).subscribe({
            next: () => {
                this.exit = true;
                this.router.navigate(["/auth/login"]);
            },
            error: (error) => {
                console.log(error);
            },
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

    fileChangeEvent(event: unknown): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    saveImage() {
        this.newUser.avatar = this.croppedImage;
    }
}
