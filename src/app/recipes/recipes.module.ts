import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import {RecipeStart} from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule ({
    declarations: [
        RecipesComponent,
        RecipeDetailsComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStart,
        RecipeEditComponent
    ],
    imports: [
        SharedModule,
        RouterModule, 
        ReactiveFormsModule, 
        RecipesRoutingModule
    ]
    // exports: [
    //     RecipesComponent,
    //     RecipeDetailsComponent,
    //     RecipeListComponent,
    //     RecipeItemComponent,
    //     RecipeStart,
    //     RecipeEditComponent        
    // ]
})
export class RecipeModule {}