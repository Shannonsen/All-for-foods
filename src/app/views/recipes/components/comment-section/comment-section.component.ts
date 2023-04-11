import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/views/shared/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit, OnChanges {
  @Input() comments: Comment[] = [];

  commentForm: FormGroup = new FormGroup({
    author: new FormControl('', Validators.required),
    commentText: new FormControl('', Validators.required),
  });

  constructor(private commentService: CommentService, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      author: ['', Validators.required],
      commentText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comments']) {
      this.comments = changes['comments'].currentValue;
    }
  }

  addComment(): void {
    const { author, commentText } = this.commentForm.value;

    if (!commentText) { return; }

    const newComment: Comment = {
      id: 0,
      recipeId: 0,
      author: author,
      commentText: commentText
    };
    
    this.commentService.addComment(newComment);
    this.comments.push(newComment);

    this.commentForm.reset();
  }
}
