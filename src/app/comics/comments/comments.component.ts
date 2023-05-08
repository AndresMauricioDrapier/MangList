import { Component, OnInit, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Commentary } from "../interfaces/comment";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UsersService } from "src/app/users/services/users.service";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { StarRatingComponent } from "./star-rating/star-rating.component";

@Component({
    selector: "ml-comments",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        StarRatingComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly userServices: UsersService,
        private fb: NonNullableFormBuilder
    ) {}

    @Input() comicId!: string;

    comments!: Commentary[];
    userComment = false;

    newComment: Commentary = {
        stars: 0,
        text: "",
        date: "",
    };

    formComment!: FormGroup;
    commentControl!: FormControl<string>;

    ngOnInit(): void {
        // this.userServices.getUser(0, true).subscribe(
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //     (u) =>
        //         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //         (this.userComment = this.userHaveComment(this.comments, u._id!))
        // );

        this.commentControl = this.fb.control("", [Validators.required]);

        this.formComment = this.fb.group({
            comment: this.commentControl,
        });
    }

    addComment() {
        this.newComment.text = this.commentControl.value;
    }

    userHaveComment(comments: Commentary[], id: number): boolean {
        return comments.some((c) => c.user?._id == id);
    }

    setRating(newRating: number): void {
        this.newComment.stars = newRating;
    }

    validClasses(control: FormControl, validClass: string, errorClass: string) {
        return {
            [validClass]: control.touched && control.valid,
            [errorClass]: control.touched && control.invalid,
        };
    }
}
