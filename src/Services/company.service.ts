import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { company } from 'src/Data/company';
import { GenericService } from 'src/GenericService/generic.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly baseUrl = "http://localhost/EskaCompanySystem/api/Company";
 private service:GenericService<company> = new GenericService<company>(this.http,this.baseUrl);
 httpOptions = this.service.getToken();

  constructor(private http:HttpClient) { }
  //DTO
 getAll():Observable<any>{
 return  this.service.getAll(this.httpOptions);
 }
 insert(comp:company):Observable<any>{
   debugger;
   return this.service.insert(comp,this.httpOptions);
 }
 getById(nId:number):Observable<any>{
  debugger;
   return this.service.getById(nId,this.httpOptions);
 }

update(comp:company):Observable<any>{
  debugger;
  return this.service.update(comp,this.httpOptions);
}
delete(nId:number):Observable<any>{
  return this.service.delete(nId,this.httpOptions);
}
}
