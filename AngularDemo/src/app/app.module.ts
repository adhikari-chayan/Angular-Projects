import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms';

import { AppComponent }  from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeTitlePipe } from './employee/employee-title.pipe';
import { EmployeeCountComponent } from './employee/employee-count.component'

@NgModule({
  imports:      [ BrowserModule,FormsModule ],
  declarations: [ AppComponent,EmployeeComponent,EmployeeListComponent,EmployeeTitlePipe,EmployeeCountComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
