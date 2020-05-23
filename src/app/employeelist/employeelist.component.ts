import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router, NavigationStart, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouteStateService } from '../services/route-state.service';
import { filter } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEmployee } from '../interface/employee';
import { InternetConnectionStatusService } from '../services/internet-connection-status.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
// import { RouteStateService } from '../services/route-state.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  employees:IEmployee[];
  filteredEmployees:IEmployee[];
  @ViewChild(CdkVirtualScrollViewport) viewPort : CdkVirtualScrollViewport;
  @Input() _searchTerm:string;
  loading:boolean=false;
  _state:number=0;
  error:any ="";

  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value:string){
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  filtereEmployees(searchTerm:string){
    if(searchTerm !== "")
      return this.employees.filter(employee => employee.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || employee.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || employee.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    else 
      return this.employees;
  }
  
  constructor(private _employeeService:EmployeeService,
    private _route:Router,
    private location:Location,
    private routeState:RouteStateService,
    private _router:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private _status:InternetConnectionStatusService) {
      
  
      // this.employees=this._router.snapshot.data['employeeList'];
      
    }


  ngOnInit(): void {
    // this._employeeService.getState()
    this.fetchData();
    // if(this._router.snapshot.queryParamMap.has('searchTerm') && this.filteredEmployees){
    //   console.log("hello");
    //   this.searchTerm = this._router.snapshot.queryParamMap.get('searchTerm');
    // }
    
    // console.log(this.routeState.getHistory());
    // console.log(this.routeState.getHistory());
   
  }
  
  ngAfterViewInit(){
    this._state = this._employeeService.getState();
    setTimeout(() => {
      this.viewPort.scrollToIndex(this._state, 'auto');
      },0.5);
    // this.viewPort.scrollToIndex(this._employeeService.getState());
    this.viewPort.scrolledIndexChange.subscribe(e=>this._employeeService.setState(e));
  }
  ngOnDestroy(){
    this.viewPort.scrolledIndexChange.subscribe(e=>console.log(e));
  }
  public fetchData(){
    this.loading=true;
    this._employeeService.getEmployeeList().subscribe(data => {this.employees = data
    , this.loading=false},
      error => {this.error = error.statusText,this.loading=false},
      () => {this.filteredEmployees = this.employees,this.searchTerm = this._router.snapshot.queryParamMap.get('searchTerm');
    }
    );
  }
  
  detailNavigate(id:string){
    this._route.navigate(['/detail'],{queryParams:{'id':id,'searchTerm':this._searchTerm,'testparams':'testvalue'}});
  }
  deleteEmployee(id:string){
    if(this._status.getStatus().subscribe((e)=> {return e;})){
      this._employeeService.deleteEmployee(id).subscribe(
        (data)  => { console.log(data); },
        error=> console.log(error),
        () =>{
          // const i = this.employees.findIndex((e: { id: string; })=> e.id===id);
          this._searchTerm = this._searchTerm;
          this.filteredEmployees = this.filteredEmployees.filter(e => e.id !== id);
          this.employees=this.employees.filter(e => e.id !== id);
          // this.filteredEmployees= this.employees; 
        })
    }
  }

  editEmployee(id:string){
    this._route.navigate(['/edit',id],{
      queryParams:{'searchTerm':this._searchTerm}
    })
  }
}
