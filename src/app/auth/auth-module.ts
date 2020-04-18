import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateModeratorComponent } from './createModerator/createModerator.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CreateModeratorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule {}
