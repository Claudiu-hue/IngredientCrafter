import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [];
  recipeChanged = new Subject<Recipe[]>();

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }
}
