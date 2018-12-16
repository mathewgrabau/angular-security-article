import { Component } from '@angular/core';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = "Paul's Training Company";
  securityObject: AppUserAuth = null; // Make it not have anything here initially.

  constructor (private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  // Invoke the logout method to get the user logged out
  logout(): void {
    this.securityService.logout();
  }
}
