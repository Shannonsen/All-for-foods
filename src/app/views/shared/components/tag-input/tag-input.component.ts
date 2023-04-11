import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { Event } from 'jquery';

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
  @Output() outputItems = new EventEmitter<Ingredient[]>();
  @Output() outputTagSearch = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  cleanTags(){
    this.itemsAsObjects = [];
    this.outputItems.emit(this.itemsAsObjects);
    this.outputTagSearch.emit(true);
  }

  searchTags(){
    this.outputTagSearch.emit(true);
  }
}
