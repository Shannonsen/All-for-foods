import { Component, OnInit, Input} from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-list-comments-pagination',
  templateUrl: './list-comments-pagination.component.html',
  styleUrls: ['./list-comments-pagination.component.scss']
})
export class ListCommentsPaginationComponent implements OnInit {

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number[] = [];
  sectionName: string = 'Comentarios';
  @Input() foods: Food[] = [];
  @Input() typeSearch:string = ""
  @Input() isPanel:string = ""
  @Input() typeList: string = "";
  @Input() recipeID: number =0
  constructor() { }

  ngOnInit(): void {
  }

}
