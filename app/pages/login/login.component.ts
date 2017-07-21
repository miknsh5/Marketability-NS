import { Component, OnInit, NgZone } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { Page } from "ui/page";
import { hasKey, getString, setString, clear } from "application-settings";
// import * as tnsOAuthModule from 'nativescript-oauth';
import { RouterExtensions } from "nativescript-angular/router";
import { Auth0Lock } from "nativescript-auth0";

declare let auth0Lock;

@Component({
    selector: 'mkb-login',
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {

    token: string;

    constructor(private router: RouterExtensions, private page: Page, private zone: NgZone) {
        // this.page.actionBarHidden = true;
        console.log("LoginComponent");
        if (!auth0Lock) {
            auth0Lock = new Auth0Lock({
                clientId: 'aadjxol4OAEJ1Mp02zh7PfQ9M91xdeoA',
                domain: 'marketability-ns.auth0.com',
                scope: ["offline_access openid profile email"]
            });
        }
    }

    tryLogin() {
        if (hasKey("accesstoken")) {
            this.router.navigate(["home"], { clearHistory: true });
        } else {
            this.login();
        }
    }

    login() {
        auth0Lock.show().then((res) => {
            alert(res);
        }, (error) => {
            alert(error);
        });
    }
}
