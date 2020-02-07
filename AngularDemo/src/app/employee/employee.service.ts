import { Injectable } from "@angular/core";
import { IEmployee } from "./employee";
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService{

    constructor(private _http:Http){
        
    }

     // Notice the method return type is Observable<IEmployee[]>
    getEmployees():Observable<IEmployee[]>{
        // To convert Observable<Response> to Observable<IEmployee[]>
        // we are using the map operator
        return this._http.get('http://localhost:11145/api/employee')
                         .map((response:Response)=><IEmployee[]>response.json())
                         .catch(this.handleError);
    }

    getEmployeeByCode(empCode:string):Promise<IEmployee>{
        
        // return this._http.get('http://localhost:11145/api/employee/'+empCode)
        //                  .map((response:Response)=><IEmployee>response.json())
        //                  .catch(this.handleError);   
        return this._http.get('http://localhost:11145/api/employee/'+empCode)
                         .map((response:Response)=><IEmployee>response.json())
                         .toPromise()
                         .catch(this.handlePromiseError);   


    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    handlePromiseError(error: Response):Promise<IEmployee> {
        console.error(error);
        throw (error);
    }
}