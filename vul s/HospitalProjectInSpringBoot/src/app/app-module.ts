import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDoctor } from './doctor/add-doctor/add-doctor';
import { ViewDoctor } from './doctor/view-doctor/view-doctor';
import { NurseRegistration } from './nurse/nurse-registration/nurse-registration';

import { ReceptionistRegistration } from './receptionist/receptionist-registration/receptionist-registration';
import { OfficeStaffRegistration } from './officeStaff/office-staff-registration/office-staff-registration';
import { Sidebar } from './templet/sidebar/sidebar';
import { Navbar } from './templet/navbar/navbar';
import { Footer } from './templet/footer/footer';
import { Login } from './auth/login/login';
import { AllUserProfile } from './profile/all-user-profile/all-user-profile';
import { CommonModule } from '@angular/common';
import { AddTest } from './test/add-test/add-test';
import { Medicine } from './test/medicine/medicine';
import { Department } from './department/department/department';
import { ScheduleSlot } from './Appoinment/schedule-slot/schedule-slot';
import { AddApooinment } from './Appoinment/add-apooinment/add-apooinment';
import { AddPatient } from './patient/add-patient/add-patient';
import { ViewPatient } from './patient/view-patient/view-patient';
import { AddInvoice } from './invoice/add-invoice/add-invoice';
import { AddReport } from './report/add-report/add-report';
import { PublicNav } from './templet/public-nav/public-nav';
import { DoctorIndivisualProfile } from './profile/doctor-indivisual-profile/doctor-indivisual-profile';
import { NurseIndivisualProfile } from './profile/nurse-indivisual-profile/nurse-indivisual-profile';
import { OfficeStaffIndivisualProfile } from './profile/office-staff-indivisual-profile/office-staff-indivisual-profile';
import { ReceptionistIndivisualProfile } from './profile/receptionist-indivisual-profile/receptionist-indivisual-profile';
import { ViewAllAppointment } from './Appoinment/view-all-appointment/view-all-appointment';
import { IndivisualDoctorAppointment } from './Appoinment/indivisual-doctor-appointment/indivisual-doctor-appointment';
import { AddPrescription } from './prescription/add-prescription/add-prescription';
import { ViewPrescription } from './prescription/view-prescription/view-prescription';
import { AddEmergencyPatient } from './emergency/add-emergency-patient/add-emergency-patient';
import { Word } from './word/word/word';
import { AddWard } from './ward/add-ward/add-ward';
import { BedBookingModalComponent } from './ward/bed-booking-modal-component/bed-booking-modal-component';
import { BedBooking } from './word/bed-booking/bed-booking';
import { AddTestsAdmittedPatient } from './testAdmittedPatient/add-tests-admitted-patient/add-tests-admitted-patient';
import { PharmacyMedicine } from './pharmacy/pharmacy-medicine/pharmacy-medicine';
import { Sale } from './pharmacy/sale/sale';
import { Supplier } from './pharmacy/supplier/supplier';
import { Purchase } from './pharmacy/purchase/purchase';
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
import { AdmiProfile } from './profile/admi-profile/admi-profile';
import { Logout } from './auth/logout/logout';
import { AuthInterceptor } from './auth/auth-interceptor/auth-interceptor';

@NgModule({
  declarations: [
    App,
    AddDoctor,
    ViewDoctor,
    NurseRegistration,
  
    ReceptionistRegistration,
        OfficeStaffRegistration,
        Sidebar,
        Navbar,
        Footer,
        Login,
        AllUserProfile,
        AddTest,
        Medicine,
        Department,
        ScheduleSlot,
        AddApooinment,
        AddPatient,
        ViewPatient,
        AddInvoice,
        AddReport,
        PublicNav,
        DoctorIndivisualProfile,
        NurseIndivisualProfile,
        OfficeStaffIndivisualProfile,
        ReceptionistIndivisualProfile,
        ViewAllAppointment,
        IndivisualDoctorAppointment,
        AddPrescription,
        ViewPrescription,
        AddEmergencyPatient,
        Word,
        AddWard,
        BedBookingModalComponent,
        BedBooking,
        AddTestsAdmittedPatient,
        PharmacyMedicine,
        Sale,
        Supplier,
        Purchase,
        MedicineStock,
        AddTestMaster,
        AddMealMaster,
        AddMeal,
        AddDoctorCharge,
        ViewNurse,
        ViewOfficeStaff,
        ViewReceptionists,
        ViewDepartment,
        AddOthersCharge,
        AddMedicineAdmitedPatient,
        AddDischargeBill,
        AllAdmittionView,
        AdmiProfile,
        Logout,
        AuthInterceptor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
