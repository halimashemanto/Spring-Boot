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
import { PublicNav } from './templet/public-nav/public-nav';
import { DoctorIndivisualProfile } from './profile/doctor-indivisual-profile/doctor-indivisual-profile';
import { ViewAllAppointment } from './Appoinment/view-all-appointment/view-all-appointment';
import { IndivisualDoctorAppointment } from './Appoinment/indivisual-doctor-appointment/indivisual-doctor-appointment';
import { AddPrescription } from './prescription/add-prescription/add-prescription';
import { ViewPrescription } from './prescription/view-prescription/view-prescription';
import { AddReport } from './report/add-report/add-report';
import { NurseIndivisualProfile } from './profile/nurse-indivisual-profile/nurse-indivisual-profile';
import { ReceptionistIndivisualProfile } from './profile/receptionist-indivisual-profile/receptionist-indivisual-profile';
import { OfficeStaffIndivisualProfile } from './profile/office-staff-indivisual-profile/office-staff-indivisual-profile';
import { AddEmergencyPatient } from './emergency/add-emergency-patient/add-emergency-patient';
import { AddWard } from './ward/add-ward/add-ward';

const routes: Routes = [
  
  { path: 'viewdoc', component: ViewDoctor },


  {path:'', component:PublicNav},

  // Registration Part
  { path: 'doc', component: AddDoctor },
  { path: 'nr', component: NurseRegistration },
  { path: 'or', component: OfficeStaffRegistration },
  { path: 'rr', component: ReceptionistRegistration },
  { path: 'login', component: Login },
  { path: 'allprofile', component: AllUserProfile },
  { path: 'doctorprofile', component: DoctorIndivisualProfile },
  { path: 'doctorpdf', component: IndivisualDoctorAppointment },

// prescription part
  {path:'test', component:AddTest},
  {path:'medicine', component:Medicine},
  {path:'department', component:Department},
  {path:'slot', component:ScheduleSlot},
  {path:'viewdoctor', component:ViewDoctor},
  {path:'addpatient', component:AddPatient},
  {path:'appoinment', component:AddApooinment},
  {path:'viewAppoinment', component:ViewAllAppointment},
  {path:'invoice', component:AddInvoice},
  {path:'pres', component:AddPrescription},
  {path:'vpres', component:ViewPrescription},
  {path:'report', component:AddReport},
  {path:'Np', component:NurseIndivisualProfile},
  {path:'rp', component:ReceptionistIndivisualProfile},
  {path:'op', component:OfficeStaffIndivisualProfile},
  {path:'emergency', component:AddEmergencyPatient},
  {path:'ward', component:AddWard},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
