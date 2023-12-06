import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersClientsPage } from './sellers-clients.page';

const routes: Routes = [
  {
    path: '',
    component: SellersClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersClientsPageRoutingModule {}
