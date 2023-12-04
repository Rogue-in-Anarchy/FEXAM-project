import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminerPage } from './examiner.page';

const routes: Routes = [
  {
    path: '',
    component: ExaminerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminerPageRoutingModule {}
