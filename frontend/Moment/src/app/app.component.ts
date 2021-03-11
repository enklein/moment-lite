import { Component } from '@angular/core';
import { AuthService } from './pages/auth/auth.service';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;

  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  
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