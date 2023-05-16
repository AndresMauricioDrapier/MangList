import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
import Swal from "sweetalert2";
import { Comic } from "../interfaces/comics";
import { CanDeactivateComponent } from "src/app/guards/leavePageGuard.guard";
import { Genres } from "../interfaces/categories";
import { ComicsService } from "../services/comics.service";

@Component({
    selector: "ml-comic-form",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ImageCropperModule,
        RouterModule,
    ],
    templateUrl: "./comic-form.component.html",
    styleUrls: ["./comic-form.component.scss"],
})
export class ComicFormComponent implements OnInit, CanDeactivateComponent {
    comicForm!: FormGroup;
    titleControl!: FormControl<string>;
    main_pictureControl!: FormControl<string>;
    synopsisControl!: FormControl<string>;
    start_dateControl!: FormControl<string>;
    genresControl!: FormControl<string>;
    num_volumesControl!: FormControl<string>;
    statusControl!: FormControl<string>;
    meanControl!: FormControl<string>;

    exit = false;
    imageChangedEvent: any = "";
    croppedImage: any = "";

    newComic: Comic = {
        title: "",
        main_picture: {
            medium: "",
            large: "",
        },
        synopsis: "",
        start_date: "",
        genres: [{ id: 0, name: "" }],
        num_volumes: 0,
        status: "",
        mean: 0,
    };

    constructor(
        private readonly router: Router,
        private readonly fb: NonNullableFormBuilder,
        private readonly route: ActivatedRoute,
        private readonly comicService: ComicsService
    ) {}

    ngOnInit(): void {
        this.titleControl = this.fb.control("", [Validators.required]);
        this.main_pictureControl = this.fb.control("", [Validators.required]);
        this.synopsisControl = this.fb.control("", [Validators.required]);
        this.start_dateControl = this.fb.control("", [Validators.required]);
        this.genresControl = this.fb.control("", [Validators.required]);
        this.num_volumesControl = this.fb.control("", [Validators.required]);
        this.statusControl = this.fb.control("");
        this.meanControl = this.fb.control("", [Validators.required]);
        this.comicForm = this.fb.group({
            title: this.titleControl,
            main_picture: this.main_pictureControl,
            synopsis: this.synopsisControl,
            start_date: this.start_dateControl,
            genres: this.genresControl,
            num_volumes: this.num_volumesControl,
            status: this.statusControl,
            mean: this.meanControl,
        });

        this.route.queryParams.subscribe((params) => {
            if (params["comicId"]) {
                console.log(params);
            }
        });
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.exit || this.comicForm.pristine) {
            return true;
        } else {
            return Swal.fire({
                title: "Si sales perderas los datos del comic",
                showDenyButton: true,
                confirmButtonText: "Salir",
                denyButtonText: "Quedarme",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Los cambios no se han guardado", "", "info");
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

    addComic() {
        this.newComic.title = this.titleControl.value;
        this.newComic.synopsis = this.synopsisControl.value;
        this.newComic.start_date = this.start_dateControl.value;
        this.newComic.genres = this.giveGenresArray();
        this.newComic.num_volumes = Number(this.num_volumesControl.value);
        this.newComic.status = this.meanControl.value;
        this.newComic.mean = Number(this.meanControl.value);

        this.comicService.addComic(this.newComic).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(err)=>{
            console.log(err);
          }
        });

        console.log(this.newComic);
    }

    giveGenresArray(): { id: number; name: string }[] {
        const arrayGenres = this.genresControl.value.split(",");
        const arrayObject: { id: number; name: string }[] = [];
        const genres = Genres;

        for (let i = 0; i < arrayGenres.length; i++) {
            genres.forEach((element) => {
                if (element.name === arrayGenres[i].trim() || element.value === arrayGenres[i].trim())
                    arrayObject.push({ id: i, name: element.value });
            });
        }
        return arrayObject;
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
        this.newComic.main_picture.large = this.croppedImage;
        this.newComic.main_picture.medium = this.croppedImage;
    }

    closeModal() {
        this.imageChangedEvent = "";
        this.croppedImage = "";
    }

    resetForm() {
        this.comicForm.reset();
        this.newComic.main_picture.medium = "";
        this.newComic.main_picture.large = "";
    }
}
