import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { department } from 'src/Data/department';
import { GenericService } from 'src/GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService{
 private readonly baseUrl = "http://localhost/EskaCompanySystem/api/Department";
 private service:GenericService<department> = new GenericService<department>(this.http,this.baseUrl);
 httpOptions = this.service.getToken();

  constructor(private http:HttpClient) { }
  
 getAll():Observable<any>{
 return  this.service.getAll(this.httpOptions);
 }
 insert(dept:department):Observable<any>{
   debugger;
   return this.service.insert(dept,this.httpOptions);
 }
 getById(nId:number):Observable<any>{
  debugger;
   return this.service.getById(nId,this.httpOptions);
 }

update(dept:department):Observable<any>{
  debugger;
  return this.service.update(dept,this.httpOptions);
}
delete(nId:number):Observable<any>{
  debugger;
  
  return this.service.delete(nId,this.httpOptions);
}
  //DTO
getDepartmentInfo():Observable<any>{
 return this.http.get(this.baseUrl+"/"+"GetDepartmentInfo",this.httpOptions);
}
}
