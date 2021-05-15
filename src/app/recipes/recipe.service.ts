import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  /* testRecipe: Recipe = new Recipe(
    'Classic Burger',
    'Tasty and juicy burger!!!',
    'https://get.pxhere.com/photo/food-fresh-hamburger-fast-food-dish-patty-cheeseburger-veggie-burger-Original-chicken-sandwich-buffalo-burger-Burger-king-premium-burgers-Burger-king-grilled-chicken-sandwiches-breakfast-sandwich-junk-food-big-mac-cuisine-whopper-ingredient-sandwich-lettuce-salmon-burger-finger-food-bun-produce-American-cheese-american-food-Baconator-slider-fried-food-bacon-sandwich-kids-meal-vegan-nutrition-meat-processed-cheese-1604207.jpg',
    [
      new Ingredient('Beef',1),
      new Ingredient('Tomato',1),
      new Ingredient('Cheddar cheese',2),
      new Ingredient('Buns',2),
      new Ingredient('French fries',20)
    ]);
  testRecipe2: Recipe = new Recipe(
    'Schnitzel',
    'Tasty Schnitzel',
    'https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
    [
      new Ingredient('Pork',1),
      new Ingredient('Egg',1)
    ]);
  private recipes: Recipe[] = [this.testRecipe, this.testRecipe2]; */

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes= recipes
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    // With slice we only get the copy.
    return this.recipes.slice();
  }

  getRecipe(index: number){
    // With slice we only get the copy.
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe (index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe (index: number) {
    this.recipes.splice(index,1)
    this.recipeChanged.next(this.recipes.slice());
  }

}
