import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  // template:`<div>
  //             <h1>{{pageHeader}}</h1>
  //             <my-employee></my-employee>
  //           </div>`
  template: '<div [innerHtml]="badHtml"></div>'
})
export class AppComponent  { 
  pageHeader:String = 'Employee Details'; 
  badHtml:string= 'Hello <script>alert("Hacked");</script> World';
}
