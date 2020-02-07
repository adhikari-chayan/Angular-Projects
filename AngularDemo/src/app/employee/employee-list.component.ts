import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { IEmployee } from "./employee";
import { UserPreferenceService } from "../Others/user-preferences.service";
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector:'list-employee',
    templateUrl:'app/employee/employee-list.component.html',
    styleUrls:['app/employee/employee-list.component.css']
    
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
    retryCount: number = 1;

    // Create a class property of type ISubscription
    // The ISubscription interface has closed property
    // The ngIf directive in the HTML binds to this property
    // Go to the difinition of ISubscription interface to
    // see the closed property
    subscription: ISubscription;

    constructor(private _employeeService: EmployeeService,private _userPreferencesService:UserPreferenceService ) {
    }


    get colour(): string {
        return this._userPreferencesService.colourPreference;
    }
    
    set colour(value: string) {
        this._userPreferencesService.colourPreference = value;
    }

    refresh(): void {
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
       
        // Use the subscription property created above to hold on to the
        // subscription.We use this object in the onCancelButtonClick()
        // method to unsubscribe and cancel the request
        this.subscription = this._employeeService.getEmployees()
                                // Retry 5 times maximum with a delay of 1 second
                                // between each retry attempt
                                .retryWhen((err) => {
                                    return err.scan((retryCount, val) => {
                                        retryCount += 1;
                                        if (retryCount < 6) {
                                            this.statusMessage = 'Retrying...Attempt #' + retryCount;
                                            return retryCount;
                                        }
                                        else {
                                            throw (err);
                                        }
                                    }, 0).delay(1000)
                                })
                                .subscribe(
                                        employeeData=>this.employees=employeeData,
                                        error => {
                                            this.statusMessage ='Problem with the service. Please try again after sometime';
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

    // This method is bound to the click event of the "Cancel Request" button
    // Notice we are using the unsubscribe() method of the subscription object
    // to unsubscribe from the observable to cancel the request. We are also
    // setting the status message property of the class to "Request Cancelled"
    // This message is displayed to the user to indicate that the request is cancelled
    onCancelButtonClick(): void {
        this.statusMessage = 'Request cancelled';
        this.subscription.unsubscribe();
    }
}