import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/Data/user';
import { logInDto } from 'src/DTOs/LogInDto';
import { userDto } from 'src/DTOs/UserDto';
import { GenericService } from 'src/GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseUrl = "http://localhost/EskaCompanySystem/api/Account";
  private userService:GenericService<user> = new GenericService<user>(this.http,this.baseUrl);
  public userServ:userDto


  constructor(private http:HttpClient) { }

  httpOptions = this.userService.getToken();

  isLoggedIn(){
    const token = localStorage.getItem("userInfo");
    if(token != null){
    const payload = atob(token?.split('.')[1]);//decode payload of token
    const parsedPayload  = JSON.parse(payload); // convert payload into an Object
    return parsedPayload.exp > Date.now()/1000; //1000
  }
  return false
  }

  getAllUsers():Observable<any>{
   return this.userService.getAll(this.httpOptions)
  }
  getByUserName(userName:string):Observable<any>{
    return this.http.get(this.baseUrl+"/"+userName,this.httpOptions);
  }
  insert(user:userDto):Observable<any>{
   return this.userService.insert(user);
  }
  update(user:userDto):Observable<any>{
    return this.userService.update(user,this.httpOptions);
   }
   delete(userName:string):Observable<any>{
    return this.http.delete(this.baseUrl+"?"+"userName="+userName,this.httpOptions);
   }
  logIn(loginUser:logInDto):Observable<any>{
    return this.http.post(this.baseUrl+"/"+"Login",loginUser);
  }
 

}
