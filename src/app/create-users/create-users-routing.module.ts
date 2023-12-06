import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUsersPage } from './create-users.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUsersPageRoutingModule {}
