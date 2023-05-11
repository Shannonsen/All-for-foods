import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllPaginationService {

  constructor(private http: HttpClient, private recipeService: RecipesService, private userService: UserService) { }

  public getServiceRecipes(typeSearch:string ="", page:number, size:number = 4, token:string = ""): Observable<any>{
    console.log("typeSearch: " + typeSearch)
    switch(typeSearch){
      case 'delete':
        return this.recipeService.getAllRecipesActivated(token, page)
      case 'active':
        return this.recipeService.getAllRecipesDesactivated(token,page)
      case 'delete-users':
        return this.userService.getAllUsersActivated(token,page)
      default:
        return this.recipeService.getAllFoods(page)
    }
  }
}
