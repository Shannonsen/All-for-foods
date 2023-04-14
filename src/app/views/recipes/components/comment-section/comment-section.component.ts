import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/views/shared/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  comments: Comment[] = [];
  commentForm: FormGroup;

  @Input() recipeID: number = 0;


  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      author: [''],
      comment: ['']
    });
  }

  ngOnInit(): void {
    console.log("ID" +  this.recipeID);
    this.commentService.getAllComments().subscribe((comments) => {
      this.comments = (comments as Comment[]).filter(x => x.recipeId === this.recipeID); 
    })
  }

  addComment() {
    const comment = this.commentForm.value;
    this.commentService.addComment(comment).subscribe(() => {
      this.comments.push(comment);
      this.commentForm.reset();
    });
  }
  
}