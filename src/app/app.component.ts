import {Component, Input} from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @Input() loadedPage = 'recipe';

  constructor(private authService: AuthService) {}


  // onNavigate(page: string){
  //   this.loadedPage = page;
  // }

  ngOnInit() {
    this.authService.autoLogIn();
  }

}
