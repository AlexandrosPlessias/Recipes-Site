import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  /*
  salt: Ingredient = new Ingredient('Salt', 1);
  pepper: Ingredient = new Ingredient('Pepper', 1);
  private ingredients: Ingredient[] = [this.salt, this.pepper]; */

  private ingredients: Ingredient[] = [];

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients= ingredients
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    console.log("NUMBER ShoppingListService: "   + index);
    return this.ingredients[index];
  }

  addIngredient( ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients( ingredients: Ingredient[]){
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient( index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


}
