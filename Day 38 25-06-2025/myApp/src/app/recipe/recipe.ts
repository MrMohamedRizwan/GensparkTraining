import { Component, inject, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RecipeModel } from '../models/Recipe';
import { RecipieService } from '../services/RecipeService';

@Component({
  selector: 'app-recipe',
  imports: [CommonModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
  standalone: true,
})
export class Recipe {
  @Input() recipe: RecipeModel | null = new RecipeModel();
  private recipeService = inject(RecipieService);
  constructor() {}
}
