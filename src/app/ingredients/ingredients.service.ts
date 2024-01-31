import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../shared/models/recipe.model';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  constructor(private recipeService: RecipeService) {}

  saveIngredients(ingredients: string[]) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }

  getIngredients(): string[] {
    const storedIngredients = localStorage.getItem('ingredients');
    return storedIngredients ? JSON.parse(storedIngredients) : [];
  }

  filterRecipesByIngredients() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    const storedIngredients = this.getIngredients();
    const ingredients: string[][] = [];
    for (let i = 0; i < recipes.length; i++) {
      ingredients.push(recipes[i].ingredients);
    }
    let countIngredient = 0;
    console.log(ingredients);
    for (const row of ingredients) {
      for (const ingredient of row) {
        if (storedIngredients.includes(ingredient)) {
          countIngredient++;
        }
      }
      if (countIngredient >= 3) {
        return row;
      }
    }
    return [];

    // const ingredients: string[] = [];
    // for (let i = 0; i < recipes.length; i++) {
    //   ingredients.push(...recipes[i].ingredients);
    // }

    // const countIngredients = ingredients.filter((ingredient)=> storedIngredients.includes(ingredient)).length
    // if(countIngredients > 3) {

    // }
  }

  deleteIngredient(index: number, ingredients: string[]) {
    ingredients.splice(index, 1);

    this.saveIngredients(ingredients);
  }
}
