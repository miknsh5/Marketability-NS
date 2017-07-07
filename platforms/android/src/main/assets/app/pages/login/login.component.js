"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var application_settings_1 = require("application-settings");
//import { AuthService } from "../../../app/shared";
var tnsOAuthModule = require("nativescript-oauth");
var LoginComponent = (function () {
    //constructor(private auth: AuthService, private router: Router) { }
    function LoginComponent(router, page) {
        this.router = router;
        this.page = page;
        this.page.actionBarHidden = true;
    }
    LoginComponent.prototype.saveToken = function () {
    };
    LoginComponent.prototype.tryLogin = function () {
        var _this = this;
        if (application_settings_1.hasKey("accesstoken")) {
            tnsOAuthModule.ensureValidToken()
                .then(function (token) {
                console.log('token: ' + token);
                _this.token = tnsOAuthModule.accessToken();
                application_settings_1.setString("accesstoken", _this.token);
                _this.router.navigate(["manager"]);
            })
                .catch(function (er) {
                //do something with the error 
                alert("error while validation. Logging in again" + er);
                tnsOAuthModule.logout();
                _this.login();
            });
        }
        else {
            this.login();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        tnsOAuthModule.login()
            .then(function () {
            console.log('logged in');
            console.dir("accessToken " + tnsOAuthModule.accessToken());
            _this.token = tnsOAuthModule.accessToken();
            application_settings_1.setString("accesstoken", _this.token);
            _this.router.navigate(["manager"]);
        })
            .catch(function (er) {
            alert("error during login" + er);
            //do something with the error 
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'mkb-login',
        templateUrl: 'pages/login/login.html',
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUE0RDtBQUM1RCxnQ0FBNkI7QUFDN0IsNkRBVThCO0FBQzlCLG9EQUFvRDtBQUNwRCxtREFBcUQ7QUFPckQsSUFBYSxjQUFjO0lBRXZCLG9FQUFvRTtJQUNyRSx3QkFBcUIsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFNRCxrQ0FBUyxHQUFUO0lBR0EsQ0FBQztJQUVBLGlDQUFRLEdBQVI7UUFBQSxpQkFxQkM7UUFwQkcsRUFBRSxDQUFDLENBQUMsNkJBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsY0FBYyxDQUFDLGdCQUFnQixFQUFFO2lCQUM1QixJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRTFDLGdDQUFTLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXRDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO2dCQUNOLDhCQUE4QjtnQkFDOUIsS0FBSyxDQUFDLDBDQUEwQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO2dCQUN0RCxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNELDhCQUFLLEdBQUw7UUFBQSxpQkFhQztRQVpHLGNBQWMsQ0FBQyxLQUFLLEVBQUU7YUFDakIsSUFBSSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxnQ0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEVBQUU7WUFDTixLQUFLLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakMsOEJBQThCO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdELGlDQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7UUFDdEMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7S0FDdEUsQ0FBQztxQ0FJOEIsZUFBTSxFQUFnQixXQUFJO0dBSDdDLGNBQWMsQ0F5RDFCO0FBekRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICxPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyICwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZ2V0Qm9vbGVhbixcclxuICAgIHNldEJvb2xlYW4sXHJcbiAgICBnZXROdW1iZXIsXHJcbiAgICBzZXROdW1iZXIsXHJcbiAgICBnZXRTdHJpbmcsXHJcbiAgICBzZXRTdHJpbmcsXHJcbiAgICBoYXNLZXksXHJcbiAgICByZW1vdmUsXHJcbiAgICBjbGVhclxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG4vL2ltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2FwcC9zaGFyZWRcIjtcclxuaW1wb3J0ICogYXMgdG5zT0F1dGhNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LW9hdXRoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItbG9naW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgLy9jb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcGFnZTogUGFnZSkgeyBcclxuICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW49dHJ1ZTtcclxuICAgfVxyXG5cclxuXHJcbnRva2VuOnN0cmluZztcclxuXHJcbiAgIFxyXG4gICBzYXZlVG9rZW4oKVxyXG4gICB7XHJcblxyXG4gICB9XHJcblxyXG4gICAgdHJ5TG9naW4oKSB7XHJcbiAgICAgICAgaWYgKGhhc0tleShcImFjY2Vzc3Rva2VuXCIpKSB7XHJcbiAgICAgICAgICAgIHRuc09BdXRoTW9kdWxlLmVuc3VyZVZhbGlkVG9rZW4oKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9rZW46ICcgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIsIHRoaXMudG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3IgXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvciB3aGlsZSB2YWxpZGF0aW9uLiBMb2dnaW5nIGluIGFnYWluXCIgKyBlcilcclxuICAgICAgICAgICAgICAgICAgICB0bnNPQXV0aE1vZHVsZS5sb2dvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0bnNPQXV0aE1vZHVsZS5sb2dpbigpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dnZWQgaW4nKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKFwiYWNjZXNzVG9rZW4gXCIgKyB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpO1xyXG4gICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzdG9rZW5cIiwgdGhpcy50b2tlbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYW5hZ2VyXCJdKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvciBkdXJpbmcgbG9naW5cIiArIGVyKTtcclxuICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nIHdpdGggdGhlIGVycm9yIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19