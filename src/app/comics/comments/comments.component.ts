import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
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
import { Auth } from "src/app/auth/interfaces/auth";
import { CommentsService } from "../services/comments.service";

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
export class CommentsComponent implements OnInit, OnChanges {
    @Input() comicId!: number;
    @Input() userId!: number;

    comments!: Commentary[];
    userComment = false;

    newComment: Commentary = {
        user: {
            _id: 0,
            name: "",
            email: "",
            avatar: "",
        },
        comicId: "",
        stars: 0,
        text: "",
        date: (new Date).toLocaleString(),
    };

    formComment!: FormGroup;
    commentControl!: FormControl<string>;

    constructor(
        private readonly userServices: UsersService,
        private readonly commentsServices: CommentsService,
        private fb: NonNullableFormBuilder
    ) {}
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["comicId"]){
          this.newComment.comicId = changes["comicId"].currentValue;

          this.commentsServices.getComments(changes["comicId"].currentValue).subscribe({
            next:(resp) =>{
              this.comments = resp.result;
              console.log(this.comments);
            },
            error:(e)=>{
              console.log(e);
            }
          })
        }
        if (changes["userId"].currentValue) {
            this.userServices
                .getUser(changes["userId"].currentValue)
                .subscribe({
                    next: (user) => {
                        this.newComment.user = user;
                    },
                    error: (e) => {
                        console.log(e);
                    },
                });
        }

    }
    ngOnInit(): void {
        this.commentControl = this.fb.control("", [Validators.required]);

        this.formComment = this.fb.group({
            comment: this.commentControl,
        });
    }

    addComment() {
        this.newComment.text = this.commentControl.value;
        this.commentsServices.addComment(this.newComment).subscribe({
          next:(resp) =>{
            console.log(resp);
          },
          error:(e)=>{
            console.log(e);
          }
        });

        window.location.reload();
    }

    userHaveComment(comments: Commentary[], id: number): boolean {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return comments.some((c) => c.user._id! == id);
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
