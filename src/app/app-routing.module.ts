import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NgModule} from '@angular/core';
import {RecipeStart} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailsComponent} from './recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  /* localhost:4200/ */
  { path: '', 
    redirectTo:  '/recipes', 
    pathMatch: 'full'
 },
  /* localhost:4200/recipes */
  { path: 'recipes', 
      component: RecipesComponent,
      canActivate: [AuthGuard],
      children: [
      /* localhost:4200/recipes/ */
      { path: '', 
      component: RecipeStart },
      /* localhost:4200/recipes/new [order matters]*/
      { path: 'new', 
      component: RecipeEditComponent },
      /* localhost:4200/recipes/recipes_id */
      { path: ':id',
        component: RecipeDetailsComponent,
        resolve: [RecipesResolverService] },
      /* localhost:4200/recipes/recipes_id/edit */
      { path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]  }
     ]},
  /* localhost:4200/shopping-list */
  { path: 'shopping-list',
    component: ShoppingListComponent
  },
  { path: 'auth', 
    component: AuthComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
