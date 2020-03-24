import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PromotionComponent } from './modules/promotion/promotion/promotion.component';
import { QualificatifComponent } from './modules/qualificatif/qualificatif/qualificatif.component';
import { HomeComponent } from './modules/home/home.component';
import { DialogInfoComponent } from './modules/dialog-info/dialog-info.component';
import { QualificatifAddComponent } from './modules/qualificatif/qualificatif-add/qualificatif-add.component';
import { QualificatifUpdateComponent } from './modules/qualificatif/qualificatif-update/qualificatif-update.component';
import { EtudiantListComponent } from './modules/etudiant/etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './modules/etudiant/etudiant-form/etudiant-form.component';
import { EtudiantDetailComponent } from './modules/etudiant/etudiant-detail/etudiant-detail.component';
import { EtudiantUpdateComponent } from './modules/etudiant/etudiant-update/etudiant-update.component';
import { from } from 'rxjs';
import { EtudiantsPromotionComponent } from './modules/etudiant/etudiants-promotion/etudiants-promotion.component';
import { QuestionComponent } from './modules/question/question/question.component';
import { RubriqueComponent } from './modules/Rubriques/rubrique/rubrique.component';
import { RubriqueAddComponent } from './modules/Rubriques/rubrique-add/rubrique-add.component';



const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'Promotion',
    component: PromotionComponent,
    children:[{
      
        path:'Etudiantspromotion/:annee/:formation',
        component:DialogInfoComponent
      
    }]
  }, {
    path: 'EtudiantsPromotion/:annee/:codeformation',
    component: EtudiantsPromotionComponent
  },{
    path: 'Question',
    component: QuestionComponent
  },{
    path: 'Qualificatif',
    component: QualificatifComponent
  },
  {
    path: 'Qualificatif/add',
    component: QualificatifAddComponent
  },
  {
    path: 'Qualificatif/update/:id/:min/:max',
    component: QualificatifUpdateComponent
  },
  { path: 'Etudiant', 
    component: EtudiantListComponent },

  { path: 'Etudiant/Add', 
    component: EtudiantFormComponent }
    ,

  { path: 'Etudiant/detail', 
    component: EtudiantDetailComponent }
    ,

  { path: 'Etudiant/update', 
    component: EtudiantUpdateComponent }
  ,

  { path: 'Rubriques', 
  component: RubriqueComponent }
  ,
  { path: 'Rubriques/Add', 
  component: RubriqueAddComponent }
  ,
  { path: '',
    component: HomeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
