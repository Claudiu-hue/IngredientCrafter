import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { RegisterService } from '../register/register.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from './models/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnInit {
  constructor(
    private http: HttpClient,
    private registerService: RegisterService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // this.fetchRecipes();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ingredientcrafter-default-rtdb.firebaseio.com/recipes.json?auth='
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
          console.log(recipes);
        })
      );
  }
}
