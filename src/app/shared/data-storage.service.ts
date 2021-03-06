import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private RECIPE_BOOK_DB = 'https://ng-recipe-book-4d747-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private RECIPE_INGREDIENT_DB = 'https://ng-recipe-book-4d747-default-rtdb.europe-west1.firebasedatabase.app/ingradients.json';
  constructor(private http: HttpClient, 
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
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

  storeIngredients() {
    const ingradients = this.shoppingListService.getIngredients();
    this.http
      .put(
        this.RECIPE_INGREDIENT_DB,
        ingradients
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchIngredients() {

    return this.http.get<Ingredient[]>(this.RECIPE_INGREDIENT_DB)
      .pipe(
              map(ingredients => {
                return ingredients;
              }),
              tap(ingredients => {
                this.shoppingListService.setIngredients(ingredients);
              })
            );

  }


}
