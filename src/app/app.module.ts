import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ViewappoinmentComponent } from './viewappoinment/viewappoinment.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ViewComponent,
    EditComponent,
    AllComponent,
    LoginComponent,
    AppointmentComponent,
    ViewappoinmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
