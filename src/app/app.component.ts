import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedRecipes = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchRecipes();
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

  private fetchRecipes() {
    this.http
      .get(
        'https://ingredientcrafter-default-rtdb.firebaseio.com/ingredients.json'
      )
      .pipe(
        map((responseData: { [key: string]: any }) => {
          const recipeArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              recipeArray.push({ ...responseData[key], id: key });
            }
          }
          return recipeArray;
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
