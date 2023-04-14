import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Clase que representa la imagen del home.
 */
@Component({
  selector: 'app-front-image',
  templateUrl: './front-image.component.html',
  styleUrls: ['./front-image.component.scss']
})
export class FrontImageComponent implements OnInit {

  constructor(private Router: Router ) { }

  /**
   * @override
   */
  ngOnInit(): void {
  }

  getRandomRecipeId(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  goToRandomRecipe(): void {
    const randomId = this.getRandomRecipeId();
    this.Router.navigate(['/recipes', randomId]);
  }

}
