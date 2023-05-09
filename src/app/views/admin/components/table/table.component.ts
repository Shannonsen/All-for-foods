import { Component, OnInit, Input} from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() foods: Food[] = [];
  sectionName: string = 'Recetas activas';
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 4;
  @Input() totalPages: number[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
