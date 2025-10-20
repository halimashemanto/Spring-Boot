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
import { AddOthersCharge } from './othersCharge/add-others-charge/add-others-charge';
import { AddMedicineAdmitedPatient } from './medicineAdmitedPatient/add-medicine-admited-patient/add-medicine-admited-patient';
import { AddDischargeBill } from './dischargeBill/add-discharge-bill/add-discharge-bill';
import { AllAdmittionView } from './viewAdmittion/all-admittion-view/all-admittion-view';
import { OfficeStaffGuard } from './guards/office-staff-guard';
import { DotorOfficeStaffGuard } from './guards/dotor-office-staff-guard';
import { AdmiProfile } from './profile/admi-profile/admi-profile';
import { Navbar } from './templet/navbar/navbar';
import { Logout } from './auth/logout/logout';
import { AdminOfficeStaffGuard } from './guards/admin-office-staff-guards-guard';
import { DoctorGuard } from './guards/doctor-guard';
import { AdminGuard } from './guards/admin-guards-guard';
import { AdminReceptionistGuard } from './guards/admin-receptionist-guards-guard';
import { NurseGuard } from './guards/nurse-guard';
import { ReceptionistsGuard } from './guards/receptionists-guard';

const routes: Routes = [




  { path: '', component: PublicNav },

  // Registration Part
  { path: 'doc', component: AddDoctor  },
  { path: 'nr', component: NurseRegistration },
  { path: 'or', component: OfficeStaffRegistration },
  { path: 'rr', component: ReceptionistRegistration },
  { path: 'login', component: Login },
  {path: 'logout',component: Logout},
  



  // prescription part
  { path: 'test', component: AddTest },
  { path: 'medicine', component: Medicine },
  { path: 'pres', component: AddPrescription, canActivate: [DoctorGuard] },
  { path: 'vpres', component: ViewPrescription , canActivate: [AdminGuard] },//admin sub admin registration 



  //Appointment Part
  { path: 'slot', component: ScheduleSlot, canActivate: [AdminOfficeStaffGuard] },
  { path: 'department', component: Department, canActivate: [AdminOfficeStaffGuard] },
  { path: 'viewdep', component: ViewDepartment, canActivate: [AdminOfficeStaffGuard] },
  { path: 'appoinment', component: AddApooinment },
  { path: 'viewAppoinment', component: ViewAllAppointment , canActivate: [AdminReceptionistGuard]},
  { path: 'doctorpdf', component: IndivisualDoctorAppointment , canActivate: [AdminReceptionistGuard]},
  { path: 'admi', component: AdmiProfile , canActivate: [AdminGuard]},



  //Emergency part
  { path: 'emergency', component: AddEmergencyPatient, canActivate: [AdminOfficeStaffGuard] },
  { path: 'addpatient', component: AddPatient , canActivate: [AdminReceptionistGuard]},



  //Invoice-Report part
  { path: 'invoice', component: AddInvoice , canActivate: [DotorOfficeStaffGuard] },
  { path: 'report', component: AddReport , canActivate: [DotorOfficeStaffGuard] },


  //profile part
  { path: 'Np', component: NurseIndivisualProfile , canActivate: [NurseGuard]},
  { path: 'rp', component: ReceptionistIndivisualProfile, canActivate: [ReceptionistsGuard] },
  { path: 'op', component: OfficeStaffIndivisualProfile , canActivate: [OfficeStaffGuard]},
  { path: 'allprofile', component: AllUserProfile , canActivate: [AdminGuard]},
  { path: 'doctorprofile', component: DoctorIndivisualProfile , canActivate: [AdminGuard]},
  { path: 'viewdoctor', component: ViewDoctor , canActivate: [AdminGuard]},
  
  { path: 'viewnurse', component: ViewNurse , canActivate: [AdminGuard]},
  { path: 'viewofficestaff', component: ViewOfficeStaff , canActivate: [AdminGuard]},
  { path: 'viewreceptionists', component: ViewReceptionists , canActivate: [AdminGuard]},




  //ward-bedbooking part
  { path: 'ward', component: AddWard, canActivate: [AdminOfficeStaffGuard]},
  { path: 'bb', component: BedBookingModalComponent, canActivate: [AdminOfficeStaffGuard] },
  { path: 'facility', component: Word , canActivate: [AdminOfficeStaffGuard]},
  { path: 'bedbooked', component: BedBooking, canActivate: [AdminOfficeStaffGuard] },
  { path: 'aav', component: AllAdmittionView , canActivate: [AdminOfficeStaffGuard]},




  //Pharmacy part
  { path: 'pm', component: PharmacyMedicine, canActivate: [AdminOfficeStaffGuard] },
  { path: 'sp', component: Supplier, canActivate: [AdminOfficeStaffGuard] },
  { path: 'p', component: Purchase , canActivate: [AdminOfficeStaffGuard] },
  { path: 's', component: Sale , canActivate: [AdminOfficeStaffGuard] },
  { path: 'ms', component: MedicineStock, canActivate: [AdminOfficeStaffGuard]  },


  //Admitted-Patient Part
  { path: 'at', component: AddTestsAdmittedPatient, canActivate: [AdminOfficeStaffGuard]  },
  { path: 'atm', component: AddTestMaster , canActivate: [AdminOfficeStaffGuard] },
  { path: 'mm', component: AddMealMaster , canActivate: [AdminOfficeStaffGuard] },
  { path: 'mmm', component: AddMeal , canActivate: [AdminOfficeStaffGuard] },
  { path: 'adc', component: AddDoctorCharge , canActivate: [AdminOfficeStaffGuard] },
  { path: 'aoc', component: AddOthersCharge , canActivate: [AdminOfficeStaffGuard] },
  { path: 'amap', component: AddMedicineAdmitedPatient , canActivate: [AdminOfficeStaffGuard] },
  { path: 'adcb', component: AddDischargeBill , canActivate: [AdminOfficeStaffGuard] },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
