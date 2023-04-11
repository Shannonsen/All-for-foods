import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.form = new FormBuilder().group({
      chips: [['chip'], []]
    });
  }

  disabled = true;

  @Input() itemsAsObjects: Ingredient[] = [];//[{ id: 0, name: 'Angular' }, { id: 1, name: 'React' }];
  @Output() changeItemAsObjects = new EventEmitter<Ingredient[]>();

  ngOnInit(): void {
  }

  onRemove(event: any) {
    this.changeItemAsObjects.emit(this.itemsAsObjects);
  }

  cleanTags(){
    this.itemsAsObjects = [];
    this.changeItemAsObjects.emit(this.itemsAsObjects);
  }
}
