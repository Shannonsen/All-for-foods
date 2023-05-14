import { Component, OnInit, Input} from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  @Input() comments: Comment[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
