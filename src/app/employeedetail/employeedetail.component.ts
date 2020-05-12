import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.css']
})
export class EmployeedetailComponent implements OnInit {
  employeeId:string;
  employee:any;
  errorMsg:string;
  imageLink:string='../../assets/images/paras.jpg';
  constructor(private _route:ActivatedRoute,private _employeeService:EmployeeService) { }

  ngOnInit(): void {
    // this.employeeId=this._route.queryParams
    console.log(this._route.queryParams);
    this._route.queryParams.subscribe(params => this.employeeId=params['id']);
    this._employeeService.getEmployee(this.employeeId).subscribe(
      data => this.employee=data,
      error => this.errorMsg=error.statusText,
    );
  }

  
}
