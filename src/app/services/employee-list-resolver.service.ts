import { Injectable } from '@angular/core';
import { Employee, IEmployee } from '../interface/employee';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolverService implements Resolve<IEmployee[]>{
  constructor(private _employeeService:EmployeeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<IEmployee[]>{
    return this._employeeService.getEmployeeList();
  }
}
