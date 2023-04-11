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

  changeRating(idStar:number, idProduct:number){

    const star = document.getElementById(String("star-"+ idStar + "-"+ idProduct))!;
    if(star.style.color=="#F4DF21"){
      star.style.color="gray";
      star.style.scale="1";
    }else{
      star.style.color="#F4DF21";
      star.style.scale="1.2";
    }

  }

}
