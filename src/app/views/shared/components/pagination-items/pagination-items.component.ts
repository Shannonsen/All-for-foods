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
  @Input() items: Food[] = []
  @Input() currentPage: number = 1;
  @Output() outputCurrentPage = new EventEmitter<number>();
  @Input() pageSize: number = 3;
  @Input() totalPages: number[] = [];
  @Input() showEditButton: boolean = false;
  users: User[] = [];
  differ: any;
  /**
   * @constructor
   * @param {KeyValueDiffers} differsm : Detecta cambios en los objetos
   * @param {UserService} userService : Servicio de usuarios
   */
  constructor(private differs: KeyValueDiffers, private userService: UserService) {
    this.differ = this.differs.find({}).create();
  }
  /**
   * @override
   */
  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users as User[];
    });
  }
  /**
   * Método lanzado cuando un objeto cambia de valor
   */
  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem((item: any) => {

      });
    }
  }

  /**
   * Método que se encarga de manejar la lógica de la clase al realizar un cambio de página
   * @param {number} pageNumber : Número de la página
   */
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.outputCurrentPage.emit(this.currentPage);
  }
}
