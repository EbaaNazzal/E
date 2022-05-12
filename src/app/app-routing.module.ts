import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { DepartmentComponent } from './department/department.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/Share/auth.guard';


const routes:Routes = [
  {path:'',component:LogInComponent},
  {path:'company',component:CompanyComponent,canActivate: [AuthGuard]},
  {path:'user',component:UserComponent,canActivate: [AuthGuard]},
  {path:'department',component:DepartmentComponent,canActivate: [AuthGuard]},
  {path:'register',component:RegisterComponent}
 ]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]

})
export class AppRoutingModule { }
