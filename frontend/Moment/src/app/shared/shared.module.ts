import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { ClockComponent } from './components/clock/clock.component';


@NgModule({
  declarations: [ClockComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzIconModule,
    NzAffixModule
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzIconModule,
    NzAffixModule,
    ClockComponent
  ]
})
export class SharedModule { }
