import { Component, OnInit, NgZone } from "@angular/core";

import { Router, NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";
//import { AuthService } from "../../../app/shared";
import * as tnsOAuthModule from 'nativescript-oauth';

@Component({
    selector: 'mkb-login',
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {

    token: string;

    //constructor(private auth: AuthService, private router: Router) { }
    constructor(private router: Router, private page: Page, private zone: NgZone) {
        this.page.actionBarHidden = true;
    }

    tryLogin() {
        if (hasKey("accesstoken")) {
            tnsOAuthModule.ensureValidToken()
                .then((token: string) => {
                    console.log('token: ' + token);
                    this.token = tnsOAuthModule.accessToken();

                    setString("accesstoken", this.token);
                    this.zone.run(() => {
                        this.router.navigate(["profile"]);
                    });
                })
                .catch((er) => {
                    //do something with the error 
                    alert("error while validation. Logging in again" + er)
                    tnsOAuthModule.logout();
                    this.login();
                });
        }
        else {
            this.login();
        }
    }

    login() {
        tnsOAuthModule.login()
            .then(() => {
                console.log('logged in');
                console.dir("accessToken " + tnsOAuthModule.accessToken());
                this.token = tnsOAuthModule.accessToken();
                setString("accesstoken", this.token);
                this.zone.run(() => {
                    this.router.navigate(["profile"]);
                });
            })
            .catch((er) => {
                alert("error during login" + er);
                //do something with the error 
            });
    }
}
