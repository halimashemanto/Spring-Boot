import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctor } from './doctor/add-doctor/add-doctor';
import { NurseRegistration } from './nurse/nurse-registration/nurse-registration';
import { Login } from './auth/login/login';
import { AllUserProfile } from './profile/all-user-profile/all-user-profile';
import { ViewDoctor } from './doctor/view-doctor/view-doctor';
import { OfficeStaffRegistration } from './officeStaff/office-staff-registration/office-staff-registration';
import { ReceptionistRegistration } from './receptionist/receptionist-registration/receptionist-registration';
import { AddTest } from './test/add-test/add-test';
import { Medicine } from './test/medicine/medicine';
import { Department } from './department/department/department';
import { ScheduleSlot } from './Appoinment/schedule-slot/schedule-slot';
import { AddPatient } from './patient/add-patient/add-patient';
import { AddApooinment } from './Appoinment/add-apooinment/add-apooinment';
import { AddInvoice } from './invoice/add-invoice/add-invoice';

const routes: Routes = [
  { path: '', component: AddDoctor },
  { path: 'viewdoc', component: ViewDoctor },

  // Registration Part
  { path: '', component: AddDoctor },
  { path: 'nr', component: NurseRegistration },
  { path: 'or', component: OfficeStaffRegistration },
  { path: 'rr', component: ReceptionistRegistration },
  { path: 'login', component: Login },
  { path: 'allprofile', component: AllUserProfile },

// prescription part
  {path:'test', component:AddTest},
  {path:'medicine', component:Medicine},
  {path:'department', component:Department},
  {path:'slot', component:ScheduleSlot},
  {path:'viewdoctor', component:ViewDoctor},
  {path:'addpatient', component:AddPatient},
  {path:'appoinment', component:AddApooinment},
  {path:'invoice', component:AddInvoice},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
