import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctor } from './doctor/add-doctor/add-doctor';

const routes: Routes = [
  {path:'adddoctor',component:AddDoctor}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
