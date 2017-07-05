import { Component ,OnInit } from "@angular/core";

import { Router , NavigationExtras } from "@angular/router";
import {Page} from "ui/page";
//import { AuthService } from "../../../app/shared";
import * as tnsOAuthModule from 'nativescript-oauth';

@Component({
    selector: 'mkb-login',
    templateUrl: 'pages/login/login.html',
   styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {

    //constructor(private auth: AuthService, private router: Router) { }
   constructor( private router: Router) { }


token:string;

   
   Profile()
   { 
       tnsOAuthModule.login()
    .then(()=>{
        console.log('logged in');
        console.dir("accessToken " + tnsOAuthModule.accessToken());
        this.token=tnsOAuthModule.accessToken();
        //console.log(this.token);
        //alert(tnsOAuthModule.accessToken());
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "accesstoken": this.token
                
            }
        };

     // this.router.navigate(["manager"],navigationExtras);
    })
    .catch((er)=>{
          alert(er);
        //do something with the error 
    });

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
