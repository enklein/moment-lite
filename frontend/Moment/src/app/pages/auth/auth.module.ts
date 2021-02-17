import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';

import { SharedModule } from '../../shared/shared.module'


@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
