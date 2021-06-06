import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import {RecipesComponent} from './recipes.component';
import {RecipeStart} from './recipe-start/recipe-start.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes-resolver.service';


const recipeRoutes: Routes = [

  /* localhost:4200/recipes , when Lazy loading enabled */
  { 
     path: '', 
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
     ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
