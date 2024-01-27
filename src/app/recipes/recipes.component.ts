import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../shared/models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription = new Subscription();
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.recipesSubscription = this.dataStorageService
      .fetchRecipes()
      .subscribe((ceva) => {
        this.recipes = ceva;
      });

    console.log(this.recipes);
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
