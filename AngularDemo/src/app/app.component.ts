import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl:'app/app.component.html'
})
export class AppComponent  { 

  applyBoldClass: boolean = false;
  applyItalicsClass: boolean = true;
  classesToApply:string='italicsClass boldClass';
  pageHeader:string = 'Employee Details'; 
  badHtml:string= 'Hello <script>alert("Hacked");</script> World';
  userText: string = 'Pragim';
  addClasses(){
    let classes={
      boldClass:this.applyBoldClass,
      italicsClass:this.applyItalicsClass

    }

    return classes;
  }


  isBold: boolean = true;
  fontSize: number = 15;
  isItalic: boolean = true;

  addStyles() {
        let styles = {
            'font-weight': this.isBold ? 'bold' : 'normal',
            'font-style': this.isItalic ? 'italic' : 'normal',
            'font-size.px': this.fontSize
        };

        return styles;
    }
}
