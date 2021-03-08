import { Component } from '@angular/core';
import { TokenStorageService } from './pages/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.loggedIn = !!this.tokenStorageService.getToken();

    if (this.loggedIn) {
      const user = this.tokenStorageService.getUser();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}