import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './interface/employee';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(employees:Employee[],searchTerm:string):Employee[] {
    if(!employees || !searchTerm){
      return employees;
    }
    return employees.filter(employee => employee.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  } 

}
