import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

/* Don't need to export the providers... 
   best use the below except InterceptorService case */
/* @Injectable({ providedIn: 'root' }) */
@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
       ]
})
export class CoreModule {}