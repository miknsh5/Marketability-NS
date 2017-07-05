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
        var _this = this;
        tnsOAuthModule.login()
            .then(function () {
            console.log('logged in');
            console.dir("accessToken " + tnsOAuthModule.accessToken());
            _this.token = tnsOAuthModule.accessToken();
            console.log(_this.token);
            alert(tnsOAuthModule.accessToken());
            var navigationExtras = {
                queryParams: {
                    "accesstoken": _this.token
                }
            };
            _this.router.navigate(["manager"], navigationExtras);
        })
            .catch(function (er) {
            alert(er);
            //do something with the error 
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUE0RDtBQUU1RCxvREFBb0Q7QUFDcEQsbURBQXFEO0FBT3JELElBQWEsY0FBYztJQUV2QixvRUFBb0U7SUFDckUsd0JBQXFCLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQU14QyxnQ0FBTyxHQUFQO1FBQUEsaUJBd0JDO1FBdEJHLGNBQWMsQ0FBQyxLQUFLLEVBQUU7YUFDeEIsSUFBSSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsS0FBSyxHQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDcEMsSUFBSSxnQkFBZ0IsR0FBcUI7Z0JBQ3JDLFdBQVcsRUFBRTtvQkFDVCxhQUFhLEVBQUUsS0FBSSxDQUFDLEtBQUs7aUJBRTVCO2FBQ0osQ0FBQztZQUVKLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ0osS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1osOEJBQThCO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBR0osQ0FBQztJQUNBLGlDQUFRLEdBQVI7UUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFHckI7Ozs7WUFJSTtJQUNQLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHdCQUF3QjtRQUN0QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztLQUN0RSxDQUFDO3FDQUk4QixlQUFNO0dBSHpCLGNBQWMsQ0E0QzFCO0FBNUNZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICxPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyICwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG4vL2ltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2FwcC9zaGFyZWRcIjtcclxuaW1wb3J0ICogYXMgdG5zT0F1dGhNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LW9hdXRoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItbG9naW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgLy9jb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG5cclxuXHJcbnRva2VuOnN0cmluZztcclxuXHJcbiAgIFxyXG4gICBQcm9maWxlKClcclxuICAgeyBcclxuICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcclxuICAgIC50aGVuKCgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKFwiYWNjZXNzVG9rZW4gXCIgKyB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpKTtcclxuICAgICAgICB0aGlzLnRva2VuPXRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2tlbik7XHJcbiAgICAgICAgYWxlcnQodG5zT0F1dGhNb2R1bGUuYWNjZXNzVG9rZW4oKSk7XHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjY2Vzc3Rva2VuXCI6IHRoaXMudG9rZW5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0sbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcik9PntcclxuICAgICAgICAgIGFsZXJ0KGVyKTtcclxuICAgICAgICAvL2RvIHNvbWV0aGluZyB3aXRoIHRoZSBlcnJvciBcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGFsZXJ0KFwiTG9naW4gUGFnZVwiKTtcclxuICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAvKiBpZiAodGhpcy5hdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaG9tZSddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGgubG9naW4oKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxufVxyXG4iXX0=