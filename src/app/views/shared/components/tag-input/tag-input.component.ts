import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  itemsAsObjects: any[] = [];//[{ id: 0, name: 'Angular' }, { id: 1, name: 'React' }];

  ngOnInit(): void {
  }
}
