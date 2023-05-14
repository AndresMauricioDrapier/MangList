import { Component, OnInit, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Commentary } from "../interfaces/comment";
import { RouterModule } from "@angular/router";
import { StarRatingComponent } from "./star-rating/star-rating.component";
import { CommentsService } from "../services/comments.service";

@Component({
    selector: "ml-comments",
    standalone: true,
    imports: [CommonModule, RouterModule, StarRatingComponent],
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
    @Input() comicId!: number;

    comments!: Commentary[];
    userComment = false;

    constructor(private readonly commentsServices: CommentsService) {}

    ngOnInit(): void {
        this.commentsServices
            .getComments(this.comicId)
            .subscribe((comments) => {
                this.comments = comments.result;
                console.log(this.comments);
            });
    }
}
