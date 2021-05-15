import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; /* Optional */
}

@Injectable( {providedIn: 'root'} )
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router) {}

    private SINGUP_REQUEST_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    private LOGIN_REQUEST_URL ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

    private API_KEY = 'AIzaSyDfRnPlUFZgO1Eu70fbv-uiGOx_f6yF3gM';

    singUp(email: string, password: string) {

        return this.http
            .post<AuthResponseData>(this.SINGUP_REQUEST_URL + this.API_KEY,
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
            ).pipe(catchError(this.authHandleError),
                tap( resData => { this.authHandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); })
            );
    }

    logIn(email: string, password: string) {
        
        return this.http
            .post<AuthResponseData>(this.LOGIN_REQUEST_URL + this.API_KEY,
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
            ).pipe(catchError(this.authHandleError),
                tap( resData => { this.authHandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); })
            );

    }

    autoLogIn(){
        /* Restore data from storage - peristance storage*/
        const userData: {
            email :string,
            id :string,
            _token :string,
            _tokenExpirationDate :string 
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        } 

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token, 
            new Date(userData._tokenExpirationDate )
        );
        
        if (loadedUser.token) {
            this.user.next(loadedUser);
            
            /*Calulate remaining time
              Future date minus carrent date (now)*/
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }

    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']); /*Programtic navigation*/
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDuration: number) {
        console.log('Exparation duration in  secs: ', expirationDuration/1000);
        this.tokenExpirationTimer = setTimeout ( () => {
            this.logOut();
        }, expirationDuration);
    }


    private authHandleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date( new Date().getTime() + (expiresIn * 1000) );
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        /* Store it into our storage - peristance storage*/
        localStorage.setItem('userData', JSON.stringify(user));
        console.log(user);
    }

    private authHandleError (errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkwown error occured.' ;

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {

            /* Sing Up */
            case 'EMAIL_EXISTS': 
                errorMessage = 'The email address is already in use by another account.' ;
                break;
            case 'OPERATION_NOT_ALLOWED': 
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;

            /* Log In */
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted..' ;
                break;
            case 'INVALID_PASSWORD': 
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED': 
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }

        return throwError(errorMessage);
    }

}
