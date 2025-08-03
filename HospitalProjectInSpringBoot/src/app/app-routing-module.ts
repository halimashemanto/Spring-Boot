import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctor } from './doctor/add-doctor/add-doctor';
import { NurseRegistration } from './nurse/nurse-registration/nurse-registration';

const routes: Routes = [
  {path:'',component:AddDoctor},
  {path:'nursereg',component:NurseRegistration},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
