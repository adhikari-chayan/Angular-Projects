import { Component } from "@angular/core";

@Component({
    selector:'employee-count',
    templateUrl:'app/employee/employee-count.component.html',
    styleUrls:['app/employee/employee-count.component.css']
})
export class EmployeeCountComponent{
    all:number=10;
    male:number=5;
    female:number=5;
}


