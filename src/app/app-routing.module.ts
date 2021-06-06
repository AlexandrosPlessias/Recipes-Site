import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  /* localhost:4200/ */
  { path: '', 
    redirectTo:  '/recipes', 
    pathMatch: 'full' },

   /* localhost:4200/recipes Lazy Loading enabled */
   { 
    path: 'recipes', 
    loadChildren: './recipes/recipes.module#RecipeModule'
   },
      /* localhost:4200/shopping-list Lazy Loading enabled */
   { 
    path: 'shopping-list', 
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
   },
     /* localhost:4200/auth Lazy Loading enabled */
   { 
    path: 'auth', 
    loadChildren: './auth/auth.module#AuthModule'
  }

   // { path: '', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
