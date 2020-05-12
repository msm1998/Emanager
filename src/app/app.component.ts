import { Component } from '@angular/core';
import { Router,RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { InternetConnectionStatusService } from './services/internet-connection-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status:boolean;
  constructor(public route:Router,
    private _status:InternetConnectionStatusService){
    
  }
  ngOnInit(){
    this._status.getStatus().subscribe((e)=>alert(e?"you are now connected":"you are't connected to the network!"));
    
  }

  title = 'Emanager';
}
