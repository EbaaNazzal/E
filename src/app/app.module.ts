import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ConfirmEqualValidatorDirective } from 'src/Share/confirm-equal-validator.directive';
@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    DepartmentComponent,
    LogInComponent,
    UserComponent,
    RegisterComponent,
    ConfirmEqualValidatorDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
