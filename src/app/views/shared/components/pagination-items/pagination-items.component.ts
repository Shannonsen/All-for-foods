import { Component, Input, OnInit, DoCheck, KeyValueDiffers, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Food } from '../../models/food.model';
import { User } from '../../models/user.model';
/**
 * Clase encargada de realizar la paginación
 */
@Component({
  selector: 'app-pagination-items',
  templateUrl: './pagination-items.component.html',
  styleUrls: ['./pagination-items.component.scss']
})
export class PaginationItemsComponent implements OnInit {
  @Input() sectionName: string = '';
  @Input() items: any[]= []
  @Input() currentPage: number = 1;
  @Output() outputCurrentPage = new EventEmitter<number>();
  @Input() pageSize: number = 3;
  @Input() totalPages: number[] = [];
  @Input() showEditButton: boolean = false;
  @Input() isPanel: string = "";
  @Input() typeList: string = "products";
  users: User[] = [];
  differ: any;
  /**
   * @constructor
   * @param {KeyValueDiffers} differs : Detecta cambios en los objetos
   */
  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }
  /**
   * @override
   */
  ngOnInit() {}

  /**
   * Método que se encarga de manejar la lógica de la clase al realizar un cambio de página
   * @param {number} pageNumber : Número de la página
   */
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.outputCurrentPage.emit(this.currentPage);
  }
}
