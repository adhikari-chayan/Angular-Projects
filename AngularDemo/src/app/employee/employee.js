"use strict";
var Employee = (function () {
    // The above class properties are then initialized
    // using the constructor parameters. To do something
    // like this, TypeScript has a shorthand syntax which
    // reduces the amount of code we have to write
    function Employee(code, name, gender, annualSalary, dateOfBirth) {
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.annualSalary = annualSalary;
        this.dateOfBirth = dateOfBirth;
    }
    // Implementation of the interface method
    Employee.prototype.computeMonthlySalary = function (annualSalary) {
        return annualSalary / 12;
    };
    return Employee;
}());
exports.Employee = Employee;
//Here is the shorthand syntax to initialise class properties with constructor parameters
// export class Employee implements IEmployee {
//     constructor(public code: string, public name: string, public gender: string,
//         public annualSalary: number, public dateOfBirth: string) {
//     }
// } 
//# sourceMappingURL=employee.js.map