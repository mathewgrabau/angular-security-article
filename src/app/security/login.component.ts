import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject : AppUserAuth = new AppUserAuth();
  returnUrl: string;

  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Grab the return url for the visit
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }
  
  login() {
    console.log("Invoking the login object");
    console.log(this.user);
    this.securityService.login(this.user).subscribe(response => {
      this.securityObject = response;
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

}
