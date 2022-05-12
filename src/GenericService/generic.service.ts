import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AccountService } from 'src/Services/account.service';


@Injectable({
  providedIn: 'root'
})
export  class GenericService<T> {
  // private readonly baseUrl = this.getResourceUrl();
 
 
  
  constructor(private httpClient:HttpClient,@Inject(String) private baseUrl: string ) { }

  private handleError() {
     throw new Error('Method not implemented.');
  }
 
  getToken(){
    let userInfo=JSON.parse(localStorage.getItem("userInfo")); //read token value from localstorge and convert json
    const httpOptions ={//build head 
      headers:new HttpHeaders({//send token key named authorization
        'Content-Type':'application/json',//send data json
        Authorization:'Bearer '+userInfo?.token
      })
    }
    return httpOptions;
  }

  

 public getAll(httpOptions?:any):Observable<any>
  {
     return this.httpClient.get<any>(this.baseUrl,httpOptions);
  }

  public getById(nId:number,httpOptions?:any):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/"+nId,httpOptions);

  }
  public insert(obj:T,httpOptions?:any):Observable<any>{
    debugger;
    return this.httpClient.post(this.baseUrl,obj,httpOptions);

  }
  public update(obj:T,httpOptions?:any):Observable<any>{
    return this.httpClient.put(this.baseUrl,obj,httpOptions);

  } 
  public delete(nId:number,httpOptions?:any):Observable<any>{
    debugger;
    return this.httpClient.delete(this.baseUrl+"?"+"nId="+nId,httpOptions);
  // http://localhost/EskaCompanySystem/api/Department?nId=5

  } 
}
