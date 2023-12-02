import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationModule } from './views/admin/reservation/reservation.module';
import { EtudiantModule } from './views/admin/etudiant/etudiant.module';

import { UniversiteModule } from './views/admin/universite/universite.module';
import { ChambreModule } from './views/admin/chambre/chambre.module';
import { BlocModule } from './views/admin/bloc/bloc.module';
import { UserModule } from './views/front/user/user.module';
import { FoyerModule } from './views/admin/foyer/foyer.module';
import { DashboardModule } from './views/admin/dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReservationModule,
    EtudiantModule,
    FoyerModule,
    UniversiteModule,
    ChambreModule,
    BlocModule,
    UserModule,
    DashboardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
