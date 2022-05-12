import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompanySystem';
 constructor(private rout:Router){}
  logOut(){
    localStorage.removeItem('userInfo');
         this.rout.navigate([""]);

  }
  isLogIn(){
     if(localStorage.getItem("userInfo")==null)
     {
       return false;

     }
     return true;
  }
}
