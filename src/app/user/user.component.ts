import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { department } from 'src/Data/department';
import { response } from 'src/DTOs/Response';
import { AccountService } from 'src/Services/account.service';
import { DepartmentService } from 'src/Services/department.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users?:any
  tableMsg:boolean = false;
  savePopup:string = "insert"
  responseResult = new response()
  showMsg = false
  message?

  constructor(private accountService:AccountService,private rout:Router) { }

  ngOnInit(): void {
  this.getAll();


  }
getAll(){
  debugger;
  this.accountService.getAllUsers().subscribe(data =>{
    this.users = data;
    console.log(data)
  })
 
}

getByUserName(userName:string){
  debugger;
this.accountService.getByUserName(userName).subscribe(data=>{
  this.accountService.userServ = data
  console.log(data)
  this.rout.navigate(['/register'],{queryParams:{status:'update'}})
})
}
delete(userName:string){
  debugger;
  this.accountService.delete(userName).subscribe(data=>{
    this.responseResult = data
    if(this.responseResult.status == "Success")
    { this.showMsg = true
     this.message = this.responseResult.message
     console.log(data)
   }
    this.getAll()
   
})
}

}