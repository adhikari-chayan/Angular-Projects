import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUserAuth } from './security/app-user-auth';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SecurityService } from './shared/security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PTC';
  securityObject: AppUserAuth | undefined;
  subscription: Subscription | undefined;
  canAccessProducts: boolean = false;
  canAccessCategories: boolean = false;
  canAccessSettings: boolean = false;
  canAccessLogs: boolean = false;

  constructor(private configService: ConfigurationService, private securityService: SecurityService) {
      this.securityObject = securityService.securityObject;
   }

  ngOnDestroy(): void {
   //prevent memory leak when component is destoryed
   this.subscription!.unsubscribe();
  }
  
  ngOnInit(): void {
    this.configService.getSettings().subscribe(
      settings => this.configService.settings = settings);

    this.subscription = this.securityService.securityReset.subscribe(
      () => this.updateProperties());  
  }
  
  logout(): void{
    this.securityService.logout();
    this.securityObject = this.securityService.securityObject;
    localStorage.removeItem("AuthObject");
  }

  private updateProperties(){
    this.canAccessProducts = this.securityService.hasClaim("canAccessProducts", "true");
    this.canAccessCategories = this.securityService.hasClaim("canAccessCategories", "true");
    this.canAccessSettings = this.securityService.hasClaim("canAccessSettings", "true");
    this.canAccessLogs = this.securityService.hasClaim("canAccessLogs", "true");
  }
}
