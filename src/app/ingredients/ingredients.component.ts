import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  newIngredient: string = '';
  ingredients: string[] = [];
  constructor(private ingredientsService: IngredientsService) {}

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.getIngredients();
    console.log(this.ingredientsService.filterRecipesByIngredients());
  }

  addIngredient(ingredient: string) {
    this.ingredients.push(ingredient);
    this.ingredientsService.saveIngredients(this.ingredients);
    this.newIngredient = '';
  }

  deleteIngredient(index: number, ingredients: string[]) {
    this.ingredientsService.deleteIngredient(index, ingredients);
  }
}
