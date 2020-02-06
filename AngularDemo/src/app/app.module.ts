import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent }  from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeTitlePipe } from './employee/employee-title.pipe';
import { EmployeeCountComponent } from './employee/employee-count.component'
import { SimpleComponent } from './Others/simple.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './Others/page-not-found.component';


// Routes is an array of Route objects
// Each route maps a URL path to a component
// The 3rd route specifies the route to redirect to if the path
// is empty. In our case we are redirecting to /home

 
// The 4th route (**) is the wildcard route. This route is used
// if the requested URL doesn't match any other routes already defined
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent,EmployeeComponent,EmployeeListComponent,EmployeeTitlePipe,EmployeeCountComponent,SimpleComponent,HomeComponent,PageNotFoundComponent  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
