import { Component } from '@angular/core';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = !!this.authService.isLoggedIn;

    if (this.loggedIn) {
      const user = this.authService.getUser();
    }
  }

  logout(): void {
    this.authService.signOut();
    window.location.reload();
  }
}