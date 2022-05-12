import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { logInDto } from 'src/DTOs/LogInDto';
import { AccountService } from 'src/Services/account.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
ologin= new  logInDto();
showMessageError = false
  constructor(private formBuilder:FormBuilder,private accountService:AccountService,private rout:Router) { }
  logInForm = this.formBuilder.group({
    userName:['',Validators.required],
    password:['',Validators.required]
  
  })
    ngOnInit(): void {
    }
    OnLogin(){
      debugger;
      console.log(this.ologin)
      if(this.logInForm.valid){
      this.accountService.logIn(this.ologin).subscribe(data =>{
        debugger;
        console.log(data)
        localStorage.setItem("userInfo",JSON.stringify(data))
        if(localStorage.getItem("userInfo") != null)
        this.rout.navigate(["/department"]);
    
       
      
      })
     
    }
    else
    this.showMessageError = true
 
    }
}
