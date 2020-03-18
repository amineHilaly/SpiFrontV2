import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HomeComponent } from './modules/home/home.component';
import { DialogInfoComponent } from './modules/dialog-info/dialog-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QualificatifAddComponent } from './modules/qualificatif/qualificatif-add/qualificatif-add.component';
import { QualificatifUpdateComponent } from './modules/qualificatif/qualificatif-update/qualificatif-update.component';
import { EtudiantListComponent } from './modules/etudiant/etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './modules/etudiant/etudiant-form/etudiant-form.component';
import { EtudiantDetailComponent } from './modules/etudiant/etudiant-detail/etudiant-detail.component';
import { EtudiantService } from './service/etudiant.service';
import { EtudiantUpdateComponent } from './modules/etudiant/etudiant-update/etudiant-update.component';
import { DatePipe } from '@angular/common';
import { ConfirmationComponent } from './modules/extra/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogInfoComponent,
    QualificatifAddComponent,
    QualificatifUpdateComponent,
    EtudiantListComponent,
    EtudiantFormComponent,
    EtudiantUpdateComponent,
    EtudiantDetailComponent,
    ConfirmationComponent
  ],
  entryComponents: [DialogInfoComponent, ConfirmationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EtudiantService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
