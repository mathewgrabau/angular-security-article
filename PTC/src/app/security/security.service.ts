import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }  from 'rxjs/observable/of';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { LOGIN_MOCKS } from './login-mocks';

@Injectable()
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor() { }

  // Will reset instance so that bidnings aren't broken by generating a new instance of the auth object.
  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAddCategory = false;
    localStorage.removeItem("bearerToken");
  }

  login(entity: AppUser) : Observable<AppUserAuth> {
    this.resetSecurityObject();
    Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase()));
    if (this.securityObject.userName !== "") {
      localStorage.setItem("bearerToken", this.securityObject.bearerToken);
    }

    return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
  }

}
