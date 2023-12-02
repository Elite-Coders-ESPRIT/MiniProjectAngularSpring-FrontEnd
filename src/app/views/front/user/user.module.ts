import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AjouterReservationComponent } from './Reservation/ajouter-reservation/ajouter-reservation.component';
import { ReservationsComponent } from './Reservation/reservations/reservations.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AjouterReservationComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
