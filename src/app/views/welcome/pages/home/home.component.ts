import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/views/shared/models/food.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  products: Food[] = [
    {
      name: 'Pancakes',
      ingredients: ['glaceado', 'cupcake'],
      image: 'https://i.pinimg.com/564x/87/49/34/87493479af140b86802e338c1f2170a6.jpg',
      category: 'all',
    },
    {
      name: 'Hotcakes',
      ingredients:  ['miel', 'pan'],
      image: 'https://i.pinimg.com/564x/3d/a3/01/3da3013609055cc964c6e210119e57bc.jpg'
    },
    {
      name: 'Molletes',
      ingredients:  ['tomate', 'pan'],
      image: 'https://i.pinimg.com/564x/6c/a3/ab/6ca3abed37b7e8b9bcb20a3a90c43949.jpg'
    },
    {
      name: 'Sopa',
      ingredients:  ['salsa de tomate', 'pasta'],
      image: 'https://i.pinimg.com/564x/81/b1/3a/81b13a1a2177247b5c0d886a3c54a580.jpg'
    },
    {
      name: 'Galletas de ranitas',
      ingredients: ['masa', 'colorante'],
      image: 'https://i.pinimg.com/564x/32/06/51/3206517a8e24c5cef373c183ede41a98.jpg'
    },
    {
      name: 'Pastel de cumpleaños',
      ingredients: ['chocolate', 'glaseado'],
      image: 'https://i.pinimg.com/564x/64/06/08/640608dede49b1374fa5b1ecfeacc2a9.jpg'
    }
  ]

}
