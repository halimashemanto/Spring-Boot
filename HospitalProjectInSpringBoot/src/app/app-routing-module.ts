import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctor } from './doctor/add-doctor/add-doctor';
import { NurseRegistration } from './nurse/nurse-registration/nurse-registration';
import { Login } from './auth/login/login';
import { AllUserProfile } from './profile/all-user-profile/all-user-profile';
import { ViewDoctor } from './doctor/view-doctor/view-doctor';

const routes: Routes = [
  {path:'',component:AddDoctor},
  {path:'viewdoc',component:ViewDoctor},
  {path:'nursereg',component:NurseRegistration},
  {path:'login',component:Login},
   { path: 'allprofile', component: AllUserProfile },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
