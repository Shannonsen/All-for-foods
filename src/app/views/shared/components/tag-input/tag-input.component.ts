import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
/**
 * Clase que representa las entradas por etiquetas de los ingredientes
 */
@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  form: FormGroup;
  disabled = true;
  /**
   * @constructor
   */
  constructor() {
    this.form = new FormBuilder().group({
      chips: [['chip'], []]
    });
  }

  @Input() itemsAsObjects: Ingredient[] = [];
  @Output() outputItems = new EventEmitter<Ingredient[]>();
  @Output() outputTagSearch = new EventEmitter<boolean>();

  /**
   * @override
   */
  ngOnInit(): void {
  }

  /**
   * Método encargado de limpiar las etiquetas seleccionadas
   */
  cleanTags(){
    this.itemsAsObjects = [];
    this.outputItems.emit(this.itemsAsObjects);
    this.outputTagSearch.emit(true);
  }

  /**
   * Método lanzado al eliminar una etiqueta
   * @param {any} event : Elemento que está siendo eliminado de la entrada de etiqueta
   */
  onRemove(event: any){
    this.outputItems.emit(this.itemsAsObjects);
  }

  /**
   * Método invocado cuando se da clic en el botón de búsqueda del componente de entrada de etiquetas
   */
  searchTags(){
    console.log("from tag input");
    console.log(this.itemsAsObjects);
    this.outputTagSearch.emit(true);
  }
}
