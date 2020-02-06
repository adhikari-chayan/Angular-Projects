import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { IEmployee } from "./employee";

@Component({
    selector:'list-employee',
    templateUrl:'app/employee/employee-list.component.html',
    styleUrls:['app/employee/employee-list.component.css'],
    providers:[EmployeeService]
})
export class EmployeeListComponent implements OnInit{
    employees: IEmployee[];

    // This property keeps track of which radio button is selected
    // We have set the default value to All, so all the employees
    // are displayed in the table by default
    selectedEmployeeCountRadioButton: string = 'All';
    
    // The view template will bind to this property to display
    // "Loading data. Please wait..." message when the data is
    // being loaded. If there is an error the second arrow
    // function in the subscribe method sets this property to
    // "Problem with the service. Please try again after sometime"
    statusMessage:string='Loading data. Please wait...';

    constructor(private _employeeService: EmployeeService) {
    }

    getEmployees(): void {
        this.employees = [
            {
                code: 'emp101', name: 'Tom', gender: 'Male',
                annualSalary: 5500, dateOfBirth: '06/25/1988'
            },
            {
                code: 'emp102', name: 'Alex', gender: 'Male',
                annualSalary: 5700.95, dateOfBirth: '06/09/1982'
            },
            {
                code: 'emp103', name: 'Mike', gender: 'Male',
                annualSalary: 5900, dateOfBirth: '12/08/1979'
            },
            {
                code: 'emp104', name: 'Mary', gender: 'Female',
                annualSalary: 6500.826, dateOfBirth: '10/14/1980'
            },
            {
                code: 'emp105', name: 'Nancy', gender: 'Female',
                annualSalary: 6700.826, dateOfBirth: '12/15/1982'
            },
        ];
    }

    trackByEmpCode(index:number,employee:any):string{
        return employee.code;
    }

    ngOnInit(){
       this._employeeService.getEmployees().subscribe(
                                            employeeData=>this.employees=employeeData,
                                            error => {
                                                this.statusMessage =
                                                    'Problem with the service. Please try again after sometime';
                                            }
                                            );
    }

    getTotalEmployeesCount():number{
        return this.employees.length;
    }

    getMaleEmployeesCount():number{
        return this.employees.filter(e=>e.gender==='Male').length;
    }

    getFemaleEmployeesCount():number{
        return this.employees.filter(e=>e.gender==='Female').length;
    }

    
    onEmployeeCountRadioButtonChange(selectedRadioButtonValue:string):void{
        this.selectedEmployeeCountRadioButton=selectedRadioButtonValue;
    }
}