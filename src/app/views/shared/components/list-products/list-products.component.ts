import { Component, OnInit, Input } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  @Input() products: Food[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  changeColor(id: number) {
    const heart = document.getElementById(String(id))!;
    if(heart.style.color=="red"){
      heart.style.color="gray";
      heart.style.scale="1";
    }else{
      heart.style.color="red";
      heart.style.scale="1.2";
    }
  }

}
