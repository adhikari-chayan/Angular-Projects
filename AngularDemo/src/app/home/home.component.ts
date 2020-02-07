import { Component } from '@angular/core';
import { UserPreferenceService } from '../Others/user-preferences.service';

@Component({
    template: `<h1>This is the home page</h1>
               <div>
                    Colour Preference :
                    <input type='text' [(ngModel)]='colour' [style.background]="colour"/>
                </div>`

})
export class HomeComponent {


    constructor(private _userPreferencesService:UserPreferenceService ) {
        
    }

    // Implement a getter to retrieve the colourPreference value
    // from the service
    get colour(): string {
        return this._userPreferencesService.colourPreference;
    }

    // Implement a setter to change the colourPreference value
    // of the service
    set colour(value: string) {
        this._userPreferencesService.colourPreference = value;
    }
}