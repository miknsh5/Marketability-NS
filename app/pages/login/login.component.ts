import { Component, OnInit, NgZone } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import { hasKey, getString, setString, clear } from "application-settings";
import * as tnsOAuthModule from 'nativescript-oauth';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: 'mkb-login',
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {

    token: string;

    constructor(private router: RouterExtensions, private page: Page, private zone: NgZone) {
        this.page.actionBarHidden = true;
    }

    tryLogin() {
        if (hasKey("accesstoken")) {
            this.router.navigate(["home"], { clearHistory: true });
        }
        else {
            this.login();
        }
    }

    login() {
        tnsOAuthModule.login()
            .then(() => {
                this.token = tnsOAuthModule.accessToken();
                setString("accesstoken", this.token);
                this.router.navigate(["home"], { clearHistory: true });
            })
            .catch((er) => {
                alert("error during login" + er);
            });
    }
}
