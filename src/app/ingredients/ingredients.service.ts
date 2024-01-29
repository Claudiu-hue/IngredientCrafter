import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  saveIngredients(ingredients: string[]) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }

  getIngredients(): string[] {
    const storedIngredients = localStorage.getItem('ingredients');
    return storedIngredients ? JSON.parse(storedIngredients) : [];
  }

  deleteIngredient(index: number, ingredients: string[]) {
    ingredients.splice(index, 1);

    this.saveIngredients(ingredients);
  }
}
