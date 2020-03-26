import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { PromotionComponent } from 'src/app/modules/promotion/promotion/promotion.component';
import { RouterModule } from '@angular/router';
import { QualificatifComponent } from 'src/app/modules/qualificatif/qualificatif/qualificatif.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltip, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PromotionService } from '../../service/promotion.service';


@NgModule({
  declarations: [
    DefaultComponent,
    PromotionComponent,
    QualificatifComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    PromotionService
  ]
})
export class DefaultModule { }
