import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'


@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
