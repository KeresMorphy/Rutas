// seller-detail-modal.module.ts
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDetailModalComponent } from './seller-detail-modal.component';

@NgModule({
  declarations: [SellerDetailModalComponent],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [SellerDetailModalComponent],
})
export class SellerDetailModalModule {}
