import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { department } from 'src/Data/department';
import { CompanyService } from 'src/Services/company.service';
import { DepartmentService } from 'src/Services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  popAdd:boolean=false;
  showMsg:boolean = false;
  msg:string ="";
  companies:any
  departments?:any
  tableMsg:boolean = false;
  savePopup:string = "insert"
  showMessageError =false

departmentForm = this.formBuilder.group({
  departmentId:[''],
  departmentName:['',Validators.required],
  departmentCode:['',Validators.required],
  company_Id:['',Validators.required]
});

  constructor(private formBuilder:FormBuilder,private departmentService:DepartmentService,
              private companyService:CompanyService) { }

  ngOnInit(): void {
  this.getAllDepartments();
  this.getAllCompanies();


  }
getAllDepartments(){
  debugger;
  this.departmentService.getDepartmentInfo().subscribe(data =>{
    this.departments = data;
    console.log(data)
  })
 
}

getAllCompanies(){
this.companyService.getAll().subscribe(data =>{
  this.companies = data;
  console.log(data)

})
}
insert(){
 let dept:department = new department()
  // dept = this.departmentForm.value as department
 dept.name =  this.departmentForm.controls['departmentName'].value
 dept.code =   this.departmentForm.controls['departmentCode'].value
 dept.company_Id =this.departmentForm.controls['company_Id'].value
 if(this.departmentForm.valid){
 this.departmentService.insert(dept).subscribe(a=>{
  this.getAllDepartments()
   this.showMsg = true
   this.msg = "Created"

 })
 this.popAdd = false}
 else this.showMessageError = true

}
getById(nId:number){
  debugger;
  let dept:department = new department()
  this.departmentService.getById(nId).subscribe(data=>{
   dept = data
   this.popAdd=true;
   this.savePopup = "update"
   this.departmentForm.setValue({
    departmentId:dept.id,
    departmentName:dept.name,
    departmentCode:dept.code,
    company_Id:dept.company_Id
   })
  })

}
update(){
  let dept:department = new department()
  dept.id = this.departmentForm.controls['departmentId'].value
 dept.name =  this.departmentForm.controls['departmentName'].value
 dept.code =   this.departmentForm.controls['departmentCode'].value
 dept.company_Id =this.departmentForm.controls['company_Id'].value
 this.departmentService.update(dept).subscribe(a=>{
   this.getAllDepartments()
  this.showMsg = true;
  this.msg = "Updated";
 })
 this.popAdd = false

}
delete(nId:number){
  debugger;
  this.departmentService.delete(nId).subscribe( d=>{
   this.getAllDepartments()
   this.showMsg = true;
   this.msg = "Removed";
   });
   
}
}
