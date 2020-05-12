import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponant } from './app-routing.module';
import { AppComponent } from './app.component';
// import { EmployeelistComponent } from './employeelist/employeelist.component';
// import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
// import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { FilterPipe } from './filter.pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import {ScrollingModule } from '@angular/cdk/scrolling';
import { from } from 'rxjs';
import { RouteStateService } from './services/route-state.service';
import { EmployeeListResolverService } from './services/employee-list-resolver.service';
import { InternetConnectionStatusService } from './services/internet-connection-status.service';
import {NgxSpinnerModule} from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    EditemployeeComponent,
    routingComponant,
    FilterPipe,
  ],
  imports: [
    ScrollingModule,
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [EmployeeService,RouteStateService,EmployeeListResolverService,InternetConnectionStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
