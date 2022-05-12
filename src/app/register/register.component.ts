import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/DTOs/Response';
import { userDto } from 'src/DTOs/UserDto';
import { AccountService } from 'src/Services/account.service';
import { DepartmentService } from 'src/Services/department.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  phonePattren ="07(7|8|9)[0-9]{7}";
  emailPattren = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  departments
  user = new userDto(); //two way binding
  responseResult = new response()
  popAdd = false
  message?
  confirmPassword?
  hiddenDepartmentFeild = true
  status = 'save' //button
  location="/user"
  showMessageError = false
  
  userForm = this.formBuilder.group({
    id:[''],
    fullName:['',Validators.required],
    userName:['',Validators.required],
    phoneNumber:['',[Validators.required,Validators.pattern(this.phonePattren)]],
    address:[''],
    email:['',[Validators.required,Validators.pattern(this.emailPattren)]],
    password:['',[Validators.required,Validators.minLength(3)]],
    confirmPassword:['',Validators.required],
    department_Id:['']
  }
  );

  constructor(private formBuilder:FormBuilder,private accountService:AccountService,
              private departmentService:DepartmentService,private activeRout:ActivatedRoute,
              private rout:Router) { }
  
  ngOnInit(): void {
debugger;
 if(localStorage.getItem("userInfo")==null){
   this.hiddenDepartmentFeild = true;
   this.location=""
   this.user.department_Id =null;
 }
 else  
 {this.hiddenDepartmentFeild = false
 this.departmentService.getAll().subscribe(data=>{
  this.departments = data
 })}
if(this.accountService.userServ !=null)//edit
 {
   this.user = this.accountService.userServ;
  this.status = this.activeRout.snapshot.queryParams['status']
this.userForm.controls['userName'].disable()
  }
  }

insert()
{
  console.log (this.user)
  if(this.userForm.valid ){
  this.accountService.insert(this.user).subscribe(data=>{
  this.responseResult = data
  if(this.responseResult.status == "Success")
 { this.popAdd = true
  this.message = this.responseResult.message
  console.log(data)
  console.log(this.userForm.controls['password'].value.length )
}
else
{
this.popAdd = true
this.message = "User Already Exists"
}
// this.rout.navigate([this.location])
})
}
else //else invalid
{
//   this.popAdd = true;
// this.message = "Plaser Fill all Feild"
this.showMessageError = true
}


}

update(){
  debugger;
  if(this.userForm.valid||this.userForm.controls['password'].invalid||this.userForm.controls['confirmPassword'].invalid ){
this.accountService.update(this.user).subscribe(data =>{
  debugger;
  this.responseResult = data
  if(this.responseResult.status == "Success")
 { this.popAdd = true
  this.message = this.responseResult.message
  this.rout.navigate(['/user'])
}
else
{
this.popAdd = true
this.message =  this.responseResult.message
}
});
  }
  else{
    this.popAdd = true;
this.message = "Plaser Fill all Feild"
  }
}
}
