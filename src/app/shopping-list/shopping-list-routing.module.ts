import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';


const shoppingListRoutes: Routes = [
  
  /* localhost:4200/shopping-list */
  { path: 'shopping-list',
    component: ShoppingListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
