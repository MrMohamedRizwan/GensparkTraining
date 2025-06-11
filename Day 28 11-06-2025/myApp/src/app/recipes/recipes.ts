import { Component } from '@angular/core';
import { RecipieService } from '../Services/recipie.service';
import { RecipeModel } from '../models/Recipe';
import { Recipe } from '../recipe/recipe';

@Component({
  selector: 'app-recipes',
  imports: [Recipe],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {
  recipes:RecipeModel[]|undefined=undefined;
  constructor(private recipeService:RecipieService){

  }
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(
      {
        next:(data:any)=>{
         this.recipes = data.recipes as RecipeModel[];
         console.log(this.recipes);
        },
        error:(err)=>{
         console.log(err);
        },
        complete:()=>{
          console.log("All recipes loaded successfully");
        }
      }
    )
  }

}
