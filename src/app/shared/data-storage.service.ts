import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  // CHANGE WITH YOUR BACKEND URL I USE FIREBASE
  private RECIPE_BOOK_DB = 'https://ng-recipe-book-XXXXXXX-default-rtdb.XXXXXXXX-XXXXX1.firebasedatabase.app/recipes.json';
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        this.RECIPE_BOOK_DB,
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>(this.RECIPE_BOOK_DB)
      .pipe(
              map(recipes => {
                return recipes.map(recipe => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                this.recipeService.setRecipes(recipes);
              })
            );

  }
}
