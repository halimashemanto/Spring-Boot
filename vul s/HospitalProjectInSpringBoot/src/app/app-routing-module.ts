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
import { BedBookingModalComponent } from './ward/bed-booking-modal-component/bed-booking-modal-component';
import { Word } from './word/word/word';
import { BedBooking } from './word/bed-booking/bed-booking';
import { AddTestsAdmittedPatient } from './testAdmittedPatient/add-tests-admitted-patient/add-tests-admitted-patient';
import { PharmacyMedicine } from './pharmacy/pharmacy-medicine/pharmacy-medicine';
import { Supplier } from './pharmacy/supplier/supplier';
import { Purchase } from './pharmacy/purchase/purchase';
import { Sale } from './pharmacy/sale/sale';
import { MedicineStock } from './pharmacy/medicine-stock/medicine-stock';
import { AddTestMaster } from './testMaster/add-test-master/add-test-master';
import { AddMealMaster } from './mealMaster/add-meal-master/add-meal-master';
import { AddMeal } from './mealMaster/add-meal/add-meal';
import { AddDoctorCharge } from './doctorCharge/add-doctor-charge/add-doctor-charge';
import { ViewNurse } from './nurse/view-nurse/view-nurse';
import { ViewOfficeStaff } from './officeStaff/view-office-staff/view-office-staff';
import { ViewReceptionists } from './receptionist/view-receptionists/view-receptionists';
import { ViewDepartment } from './department/view-department/view-department';

const routes: Routes = [




  { path: '', component: PublicNav },

  // Registration Part
  { path: 'doc', component: AddDoctor },
  { path: 'nr', component: NurseRegistration },
  { path: 'or', component: OfficeStaffRegistration },
  { path: 'rr', component: ReceptionistRegistration },
  { path: 'login', component: Login },


  // prescription part
  { path: 'test', component: AddTest },
  { path: 'medicine', component: Medicine },
  { path: 'pres', component: AddPrescription },
  { path: 'vpres', component: ViewPrescription },



  //Appointment Part
  { path: 'slot', component: ScheduleSlot },
  { path: 'department', component: Department },
  { path: 'viewdep', component: ViewDepartment },
  { path: 'appoinment', component: AddApooinment },
  { path: 'viewAppoinment', component: ViewAllAppointment },
  { path: 'doctorpdf', component: IndivisualDoctorAppointment },



  //Emergency part
  { path: 'emergency', component: AddEmergencyPatient },
  { path: 'addpatient', component: AddPatient },



  //Invoice-Report part
  { path: 'invoice', component: AddInvoice },
  { path: 'report', component: AddReport },


  //profile part
  { path: 'Np', component: NurseIndivisualProfile },
  { path: 'rp', component: ReceptionistIndivisualProfile },
  { path: 'op', component: OfficeStaffIndivisualProfile },
  { path: 'allprofile', component: AllUserProfile },
  { path: 'doctorprofile', component: DoctorIndivisualProfile },
  { path: 'viewdoctor', component: ViewDoctor },
  
  { path: 'viewnurse', component: ViewNurse },
  { path: 'viewofficestaff', component: ViewOfficeStaff },
  { path: 'viewreceptionists', component: ViewReceptionists },




  //ward-bedbooking part
  { path: 'ward', component: AddWard },
  { path: 'bb', component: BedBookingModalComponent },
  { path: 'facility', component: Word },
  { path: 'bedbooked', component: BedBooking },




  //Pharmacy part
  { path: 'pm', component: PharmacyMedicine },
  { path: 'sp', component: Supplier },
  { path: 'p', component: Purchase },
  { path: 's', component: Sale },
  { path: 'ms', component: MedicineStock },


  //Admitted-Patient Part
  { path: 'at', component: AddTestsAdmittedPatient },
  { path: 'atm', component: AddTestMaster },
  { path: 'mm', component: AddMealMaster },
  { path: 'mmm', component: AddMeal },
  { path: 'adc', component: AddDoctorCharge },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
