import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../models/Recipe';

@Injectable()
export class RecipieService {
  private http = inject(HttpClient);
  // getRecipe(id:number=1){
  //     return this.http.get(`https://dummyjson.com/recipes/${id}`);
  // }
  getAllRecipes(): Observable<{ recipes: RecipeModel[] }> {
    return this.http.get<{ recipes: RecipeModel[] }>(
      'https://dummyjson.com/recipes'
    );
  }
}
