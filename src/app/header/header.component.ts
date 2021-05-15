import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent /*implements OnInit*/ {
  // To call outside from this component add Output.
  // Always EventEmitter & Output is together.
  // @Output() pageSelected = new EventEmitter<string>();

  isAuthenticated:boolean = false;
  userMail:string = null;
  private userSub: Subscription;
  
  constructor(private dataStorageService: DataStorageService,
    private authService :AuthService) {}
    

    ngOnInit(): void {
      this.userSub = this.authService.user
        .subscribe( user => {
            /* !!user , true when have user false when don;t have*/
            this.isAuthenticated = !user ? false : true; 
            this.userMail = !user ? null : user.email; 
          }
        );
    }
  
    onSaveData() {
      this.dataStorageService.storeRecipes();
    }
  
    onFetchData() {
      console.log('In: onFetchData()');
      this.dataStorageService.fetchRecipes().subscribe();
    }
  
    onLogOut() {
      this.authService.logOut();
    }
  
    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
    
}
