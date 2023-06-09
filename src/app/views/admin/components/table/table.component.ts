import { Component, OnInit, Input} from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';
/**
 * Clase para reciclar la paginacion en la seccion de administracion.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() foods: Food[] = [];
  @Input() sectionName: string = "";
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 4;
  @Input() totalPages: number[] = [];
  @Input() typeSearch:string = ""
  @Input() isPanel:string = ""
  @Input() typeList: string = "";

  /**
   * @constructor
   */
  constructor() { }

  /**
   * @override
   */
  ngOnInit(): void {
  }

}
