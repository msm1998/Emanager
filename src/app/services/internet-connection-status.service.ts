import { Injectable } from '@angular/core';
import { merge, fromEvent, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionStatusService {
  status:string;
  constructor() { }
  getStatus():Observable<boolean>{
    return merge<boolean>(
      fromEvent(window,'offline').pipe(map(()=> false)),
      fromEvent(window,'online').pipe(map(()=> true)),
      new Observable((sub:Observer<boolean>)=>{
        sub.next(navigator.onLine);
        sub.complete();
      })
    )
  }
}
