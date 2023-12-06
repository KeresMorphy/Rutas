import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellersClientsPageRoutingModule } from './sellers-clients-routing.module';

import { SellersClientsPage } from './sellers-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellersClientsPageRoutingModule
  ],
  declarations: [SellersClientsPage]
})
export class SellersClientsPageModule {}
