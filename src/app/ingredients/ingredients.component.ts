import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  newIngredient: string = '';
  ingredients: string[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onInputChange(event: Event) {}

  addProduct(ingredient: string) {
    this.ingredients.push(ingredient);
    this.newIngredient = '';
    console.log(this.ingredients);
  }
}
