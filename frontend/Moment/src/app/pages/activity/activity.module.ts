import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityComponent } from './activity.component';
import { ActivityRoutingModule } from './activity-routing.module';



@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule
  ]
})
export class ActivityModule { }
