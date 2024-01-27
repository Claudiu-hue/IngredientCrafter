import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { RegisterService } from './register/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedRecipes = [];

  constructor(
    private http: HttpClient,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerService.autoLogin();
  }

  onCreateRecipe(recipeData: { title: string; content: string }) {
    this.http
      .post(
        'https://ingredientcrafter-default-rtdb.firebaseio.com/ingredients.json',
        recipeData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
