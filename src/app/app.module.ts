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
import { EtudiantsPromotionComponent } from './modules/etudiant/etudiants-promotion/etudiants-promotion.component';
import { MatIconModule, MatTooltip, MatTooltipModule } from '@angular/material';
import { AddCComponent } from './modules/questions/add/add-c/add-c.component';
import { ListCComponent } from './modules/questions/list/list-c/list-c.component';
import { UpdateCComponent } from './modules/questions/update/update-c/update-c.component';
import { ConfirmComponent } from './modules/extra/confirmQuestion/confirm/confirm.component';
import { RubriqueComponent } from './modules/Rubriques/rubrique/rubrique.component';
import { ConfirmationRubriqueComponent } from './modules/extra/confirmation-rubrique/confirmation-rubrique.component';
import { RubriqueAddComponent } from './modules/Rubriques/rubrique-add/rubrique-add.component';
import { RubriqueUpdateComponent } from './modules/Rubriques/rubrique-update/rubrique-update.component';

import { EvaluationListComponent } from './modules/evaluation/evaluation-list/evaluation-list.component';
import { EvaluationAddComponent } from './modules/evaluation/evaluation-add/evaluation-add.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr')

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
    ConfirmationComponent,
    EtudiantsPromotionComponent,
    RubriqueComponent,
    ConfirmationRubriqueComponent,
    RubriqueAddComponent,
    RubriqueUpdateComponent,
    AddCComponent,
    ListCComponent,
    UpdateCComponent,
    ConfirmComponent,
    EvaluationListComponent,
    EvaluationAddComponent,
    AddCComponent,
    ListCComponent,
    UpdateCComponent,
    ConfirmComponent,
    EvaluationListComponent,
    EvaluationAddComponent,
    
  ],
  entryComponents: [DialogInfoComponent, ConfirmationComponent,ConfirmationRubriqueComponent,ConfirmComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [EtudiantService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
