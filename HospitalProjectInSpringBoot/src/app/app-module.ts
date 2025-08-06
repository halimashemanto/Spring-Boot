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
        Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
