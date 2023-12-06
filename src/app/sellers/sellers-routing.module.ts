import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersPage } from './sellers.page';

const routes: Routes = [
  {
    path: '',
    component: SellersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersPageRoutingModule {}
