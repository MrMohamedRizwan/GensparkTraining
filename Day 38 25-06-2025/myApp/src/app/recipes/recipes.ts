import { Component } from '@angular/core';

import { Recipe } from '../recipe/recipe';
import { RecipeModel } from '../models/Recipe';
import { RecipieService } from '../services/RecipeService';

@Component({
  selector: 'app-recipes',
  imports: [Recipe],
  standalone: true,
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  recipes: RecipeModel[] | undefined = undefined;
  constructor(private recipeService: RecipieService) {}
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: { recipes: RecipeModel[] }) => {
        this.recipes = data.recipes;
        console.log(this.recipes);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('All recipes loaded successfully');
      },
    });
  }
}
