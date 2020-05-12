import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  public em = new Employee();
  @ViewChild('employeeForm') userForm:NgForm;
  public submited:boolean = false;
  edit:boolean=false;
  success:number;
  errorMsg='';
  
  constructor(private _employeeService:EmployeeService,private _route:ActivatedRoute,
    private _router:Router) { }

  ngOnInit(): void {
    this._route.params.subscribe(paramId=>{
      if(paramId.id !== "0"){
        this._employeeService.getEmployee(paramId.id).subscribe(e=>{
          // console.log(e);
          this.em=e as Employee;
        },
        ()=>{},
        ()=>{ this.edit = true;})
      }else{
        this.userForm.reset();
      }
    })
  }

  onSubmit(){
    console.log(this.edit);
    if(this.edit === true){
      this._employeeService.updateEmployee(this.em).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => this._router.navigate(['/list']),
      );
    }else{
      this.submited=true;
      this._employeeService.addEmployee(this.em)
      .subscribe(
        data => this.success=data.ok,
        error => this.errorMsg=error.statusText,
        () => this._router.navigate(['/list'])
      )}
     }
}
