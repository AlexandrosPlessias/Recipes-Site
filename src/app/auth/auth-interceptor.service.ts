import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService :AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        return this.authService
            .user
            .pipe(
                /* take(1):  get the latest user and then un-subscribe */
                /* exhaustMap: waits for the first observable (user here) to compltete*/ 
                take(1), 
                /*Return a new objervable will replace the previous obseevable
               (then the user obseevable ends replaced with inner obseevable) */
                exhaustMap(user => {

                    if ( user === null){        
                        return next.handle(req);
                    }
                    const modifiedReq = req.clone({ params:  new HttpParams().set('auth', user.token) });
                    return next.handle(modifiedReq);
                })
            );

    }

}