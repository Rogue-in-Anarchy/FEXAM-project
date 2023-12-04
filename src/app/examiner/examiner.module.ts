import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminerPageRoutingModule } from './examiner-routing.module';

import { ExaminerPage } from './examiner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExaminerPageRoutingModule
  ],
  declarations: [ExaminerPage]
})
export class ExaminerPageModule {}
