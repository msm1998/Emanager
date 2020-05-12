import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
// import { EmployeeListResolverService } from './services/employee-list-resolver.service';


const routes: Routes = [
  // { path:'',component:AppComponent },
  { path:'edit/:id',component:AddemployeeComponent},
  { path:'list',component:EmployeelistComponent,
    // resolve:{ employeelist:EmployeeListResolverService}
  },
  { path:'detail',component:EmployeedetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponant = [AddemployeeComponent,EmployeelistComponent,EmployeedetailComponent]