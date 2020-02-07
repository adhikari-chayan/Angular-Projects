"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var employee_service_1 = require("./employee.service");
var user_preferences_service_1 = require("../Others/user-preferences.service");
require("rxjs/add/operator/retrywhen");
require("rxjs/add/operator/delay");
require("rxjs/add/operator/scan");
var EmployeeListComponent = (function () {
    function EmployeeListComponent(_employeeService, _userPreferencesService) {
        this._employeeService = _employeeService;
        this._userPreferencesService = _userPreferencesService;
        // This property keeps track of which radio button is selected
        // We have set the default value to All, so all the employees
        // are displayed in the table by default
        this.selectedEmployeeCountRadioButton = 'All';
        // The view template will bind to this property to display
        // "Loading data. Please wait..." message when the data is
        // being loaded. If there is an error the second arrow
        // function in the subscribe method sets this property to
        // "Problem with the service. Please try again after sometime"
        this.statusMessage = 'Loading data. Please wait...';
        this.retryCount = 1;
    }
    Object.defineProperty(EmployeeListComponent.prototype, "colour", {
        get: function () {
            return this._userPreferencesService.colourPreference;
        },
        set: function (value) {
            this._userPreferencesService.colourPreference = value;
        },
        enumerable: true,
        configurable: true
    });
    EmployeeListComponent.prototype.refresh = function () {
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
    };
    EmployeeListComponent.prototype.trackByEmpCode = function (index, employee) {
        return employee.code;
    };
    EmployeeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Use the subscription property created above to hold on to the
        // subscription.We use this object in the onCancelButtonClick()
        // method to unsubscribe and cancel the request
        this.subscription = this._employeeService.getEmployees()
            .retryWhen(function (err) {
            return err.scan(function (retryCount, val) {
                retryCount += 1;
                if (retryCount < 6) {
                    _this.statusMessage = 'Retrying...Attempt #' + retryCount;
                    return retryCount;
                }
                else {
                    throw (err);
                }
            }, 0).delay(1000);
        })
            .subscribe(function (employeeData) { return _this.employees = employeeData; }, function (error) {
            _this.statusMessage = 'Problem with the service. Please try again after sometime';
        });
    };
    EmployeeListComponent.prototype.getTotalEmployeesCount = function () {
        return this.employees.length;
    };
    EmployeeListComponent.prototype.getMaleEmployeesCount = function () {
        return this.employees.filter(function (e) { return e.gender === 'Male'; }).length;
    };
    EmployeeListComponent.prototype.getFemaleEmployeesCount = function () {
        return this.employees.filter(function (e) { return e.gender === 'Female'; }).length;
    };
    EmployeeListComponent.prototype.onEmployeeCountRadioButtonChange = function (selectedRadioButtonValue) {
        this.selectedEmployeeCountRadioButton = selectedRadioButtonValue;
    };
    // This method is bound to the click event of the "Cancel Request" button
    // Notice we are using the unsubscribe() method of the subscription object
    // to unsubscribe from the observable to cancel the request. We are also
    // setting the status message property of the class to "Request Cancelled"
    // This message is displayed to the user to indicate that the request is cancelled
    EmployeeListComponent.prototype.onCancelButtonClick = function () {
        this.statusMessage = 'Request cancelled';
        this.subscription.unsubscribe();
    };
    return EmployeeListComponent;
}());
EmployeeListComponent = __decorate([
    core_1.Component({
        selector: 'list-employee',
        templateUrl: 'app/employee/employee-list.component.html',
        styleUrls: ['app/employee/employee-list.component.css']
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService, user_preferences_service_1.UserPreferenceService])
], EmployeeListComponent);
exports.EmployeeListComponent = EmployeeListComponent;
//# sourceMappingURL=employee-list.component.js.map