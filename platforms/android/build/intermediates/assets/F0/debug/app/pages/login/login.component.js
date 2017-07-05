"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { AuthService } from "../../../app/shared";
var tnsOAuthModule = require("nativescript-oauth");
var LoginComponent = (function () {
    //constructor(private auth: AuthService, private router: Router) { }
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.Profile = function () {
        tnsOAuthModule.login()
            .then(function () {
            console.log('logged in');
            console.dir("accessToken " + tnsOAuthModule.accessToken());
            alert(tnsOAuthModule.accessToken());
        })
            .catch(function (er) {
            alert(er);
            //do something with the error 
        });
        this.router.navigate(["manager"]);
    };
    LoginComponent.prototype.ngOnInit = function () {
        alert("Login Page");
        /* if (this.auth.isAuthenticated()) {
             this.router.navigate(['home']);
         } else {
             this.auth.login();
         }*/
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'mkb-login',
        templateUrl: 'pages/login/login.html',
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUF5QztBQUV6QyxvREFBb0Q7QUFDcEQsbURBQXFEO0FBT3JELElBQWEsY0FBYztJQUV2QixvRUFBb0U7SUFDckUsd0JBQXFCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUN4QyxnQ0FBTyxHQUFQO1FBRUksY0FBYyxDQUFDLEtBQUssRUFBRTthQUN4QixJQUFJLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ0osS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1osOEJBQThCO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDQSxpQ0FBUSxHQUFSO1FBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBR3JCOzs7O1lBSUk7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBNUJZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7UUFDdEMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7S0FDdEUsQ0FBQztxQ0FJOEIsZUFBTTtHQUh6QixjQUFjLENBNEIxQjtBQTVCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCAsT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG4vL2ltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2FwcC9zaGFyZWRcIjtcclxuaW1wb3J0ICogYXMgdG5zT0F1dGhNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LW9hdXRoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItbG9naW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgLy9jb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG4gICBQcm9maWxlKClcclxuICAgeyBcclxuICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcclxuICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKFwiYWNjZXNzVG9rZW4gXCIgKyB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpKTtcclxuICAgICAgICBhbGVydCh0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVyKT0+e1xyXG4gICAgICAgICAgYWxlcnQoZXIpO1xyXG4gICAgICAgIC8vZG8gc29tZXRoaW5nIHdpdGggdGhlIGVycm9yIFxyXG4gICAgfSk7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0pO1xyXG4gICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBhbGVydChcIkxvZ2luIFBhZ2VcIik7XHJcbiAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgLyogaWYgKHRoaXMuYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2hvbWUnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmxvZ2luKCk7XHJcbiAgICAgICAgfSovXHJcbiAgICB9XHJcbn1cclxuIl19