import { Component, inject, Input } from '@angular/core';
import { RecipeModel } from '../models/Recipe';
import { RecipieService } from '../Services/recipie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  imports: [CommonModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css'
})
export class Recipe {
  @Input() recipe:RecipeModel|null = new RecipeModel();
private recipeService = inject(RecipieService);
constructor() {
  // this.recipeService.getRecipe(1).subscribe(
  //     {
  //       next:(data)=>{
     
  //         this.recipe = data as RecipeModel;
  //         console.log(this.recipe)
  //       },
  //       error:(err)=>{
  //         console.log(err)
  //       },
  //       complete:()=>{
  //         console.log("All done");
  //       }
  //     })
}

}