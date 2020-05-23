import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { from, Observable,throwError,of } from 'rxjs';
import {catchError, shareReplay, map} from 'rxjs/operators';
import { IEmployee, Employee } from '../interface/employee';
@Injectable()
export class EmployeeService {
  base_url: string="https://tcs-emanager.herokuapp.com/api/";
  // base_url: string="http://localhost:3000/api/";

  list:Observable<IEmployee[]>;
  _index:number=0;
  employee:Observable<IEmployee[]>;
  constructor(private http:HttpClient) { }
  
  setState(index:number){
    this._index=index;
  }
  getState(){
    return this._index;
  }
  getEmployeeList():Observable<IEmployee[]>{
    if(!this.list){
      console.log('returning cache list');
      this.list=this.http.get<IEmployee[]>(this.base_url).pipe(
        shareReplay(1),
      );
    }
    return this.list;
    // return this.cache['list'];
  }  

  updateEmployee(employee:Employee){

    if(this.list){
      this.list.subscribe((e)=> {const c = e.findIndex(em=>em.id === employee.id);
        e[c].id=employee.id;
        e[c].firstName=employee.firstName;
        e[c].lastName=employee.lastName;
        e[c].age=employee.age;
        e[c].email=employee.email;
        e[c].experience=employee.experience;
        e[c].gender=employee.gender;
        e[c].level=employee.level;
        e[c].phone=employee.phone;
        e[c].salary=employee.salary;
      });
      // this.list.subscribe(e=> {this.list = of(e.filter(e=> e.id !== employee.id))});
      // this.list.subscribe(e=>{
      //   e.push(employee);
      // });
      // console.log(employee.id);  
    }
    return this.http.put<any>(this.base_url+'update',employee).pipe(map(()=>{
      this.getEmployeeList();
    }),
      catchError(this.errorHandler))
  }
  getEmployee(id:string):Observable<Object> {
    console.log(this.base_url+id);
    return this.http.get<any>(this.base_url+id).pipe(catchError(this.errorHandler));
  }

  addEmployee(employee:Employee){
    this.list.subscribe(e=>{
      e.push(employee);
    });
    return this.http.post<any>(this.base_url+'add',employee).pipe(catchError(this.errorHandler));
  }

  deleteEmployee(employee:string){
    this.list.subscribe(e=> {this.list = of(e.filter(e=> e.id !== employee))});
    return this.http.delete<string>(this.base_url+'delete/'+employee).pipe(catchError(this.errorHandler));
    
    // if(this.employee){
    //   
    // }
    // return this.employee;
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
