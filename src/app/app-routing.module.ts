import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegistrationComponent } from './registration/registration.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { LoginComponent } from './login/login.component'
import { AppointmentComponent } from './appointment/appointment.component';
import {ViewappoinmentComponent} from './viewappoinment/viewappoinment.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: "all",
    component: AllComponent
  },
  {
    path: "appointment/:patient_id",
    component: AppointmentComponent
  },
  {
    path: "ViewReg",
    component: ViewComponent
  },
  {
    path: 'EditReg/:patient_id',
    component: EditComponent
  },
  {
    path: 'viewapp',
    component:ViewappoinmentComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
