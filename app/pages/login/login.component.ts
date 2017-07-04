import { Component ,OnInit } from "@angular/core";

import { Router } from "@angular/router";
import {Page} from "ui/page";
//import { AuthService } from "../../../app/shared";


@Component({
    selector: 'mkb-login',
    templateUrl: 'pages/login/login.html',
   styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {

    //constructor(private auth: AuthService, private router: Router) { }
   constructor( private router: Router) { }
   Profile()
   {
      this.router.navigate(["manager"]);
   }
    ngOnInit() {
        alert("Login Page");
       
       /* if (this.auth.isAuthenticated()) {
            this.router.navigate(['home']);
        } else {
            this.auth.login();
        }*/
    }
}
