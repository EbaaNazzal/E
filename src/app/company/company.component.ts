import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { company } from 'src/Data/company';
import { CompanyService } from 'src/Services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  popAdd:boolean=false;
  showMsg:boolean = false;
  msg:string ="";
  companies:any =0;
  company = new company()
  tableMsg:boolean = false;
  savePopup:string = "insert";
  showMessageError=false

companyForm = this.formBuilder.group({
  companyid:[''],
  companyName:['',Validators.required],
  companyCode:['',Validators.required]
});
  constructor(private formBuilder:FormBuilder,private companyService:CompanyService) { }

  ngOnInit(): void {
    this.getAll();
    }
  getAll(){
    debugger;
    this.companyService.getAll().subscribe(data =>{
      this.companies = data;
      console.log(data)
    })
   
  }
  insert(){
   let comp:company = new company()
    comp.name =  this.companyForm.controls['companyName'].value
    comp.code =   this.companyForm.controls['companyCode'].value
    if(this.companyForm.valid){
   this.companyService.insert(comp).subscribe(a=>{
     this.getAll()
     this.showMsg = true
     this.msg = "Created"
  
   })
   this.popAdd = false
  }
  else this.showMessageError = true

  }
  getById(nId:number){
    debugger;
    let comp:company = new company()
    this.companyService.getById(nId).subscribe(data=>{
      comp = data
     this.popAdd=true;
     this.savePopup = "update"
     this.companyForm.setValue({
      companyid:comp.id,
      companyName:comp.name,
      companyCode:comp.code,
     })
    })
  
  }
  update(){
    let comp:company = new company()
    comp.id = this.companyForm.controls['companyid'].value
    comp.name =  this.companyForm.controls['companyName'].value
    comp.code =   this.companyForm.controls['companyCode'].value
   this.companyService.update(comp).subscribe(a=>{
     this.getAll()
    this.showMsg = true;
    this.msg = "Updated";
   })
   this.popAdd = false
  
  }
  delete(nId:number){
    this.companyService.delete(nId).subscribe( d=>{
     this.getAll()
     this.showMsg = true;
     this.msg = "Removed";
     });
     
  } 

  

}
