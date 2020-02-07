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
var user_preferences_service_1 = require("../Others/user-preferences.service");
var HomeComponent = (function () {
    function HomeComponent(_userPreferencesService) {
        this._userPreferencesService = _userPreferencesService;
    }
    Object.defineProperty(HomeComponent.prototype, "colour", {
        // Implement a getter to retrieve the colourPreference value
        // from the service
        get: function () {
            return this._userPreferencesService.colourPreference;
        },
        // Implement a setter to change the colourPreference value
        // of the service
        set: function (value) {
            this._userPreferencesService.colourPreference = value;
        },
        enumerable: true,
        configurable: true
    });
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        template: "<h1>This is the home page</h1>\n               <div>\n                    Colour Preference :\n                    <input type='text' [(ngModel)]='colour' [style.background]=\"colour\"/>\n                </div>"
    }),
    __metadata("design:paramtypes", [user_preferences_service_1.UserPreferenceService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map