import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUsersPageRoutingModule } from './create-users-routing.module';

import { CreateUsersPage } from './create-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUsersPageRoutingModule
  ],
  declarations: [CreateUsersPage]
})
export class CreateUsersPageModule {}
