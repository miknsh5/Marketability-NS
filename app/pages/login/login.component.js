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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUE0RDtBQUM1RCxnQ0FBNkI7QUFDN0IsNkRBVThCO0FBQzlCLG9EQUFvRDtBQUNwRCxtREFBcUQ7QUFPckQsSUFBYSxjQUFjO0lBRXZCLG9FQUFvRTtJQUNyRSx3QkFBcUIsTUFBYyxFQUFVLElBQVU7UUFBbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFNRCxrQ0FBUyxHQUFUO0lBR0EsQ0FBQztJQUVBLGlDQUFRLEdBQVI7UUFBQSxpQkFxQkM7UUFwQkcsRUFBRSxDQUFDLENBQUMsNkJBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsY0FBYyxDQUFDLGdCQUFnQixFQUFFO2lCQUM1QixJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRTFDLGdDQUFTLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXRDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO2dCQUNOLDhCQUE4QjtnQkFDOUIsS0FBSyxDQUFDLDBDQUEwQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO2dCQUN0RCxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNELDhCQUFLLEdBQUw7UUFBQSxpQkFhQztRQVpHLGNBQWMsQ0FBQyxLQUFLLEVBQUU7YUFDakIsSUFBSSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxnQ0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEVBQUU7WUFDTixLQUFLLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakMsOEJBQThCO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdELGlDQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7UUFDdEMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7S0FDdEUsQ0FBQztxQ0FJOEIsZUFBTSxFQUFnQixXQUFJO0dBSDdDLGNBQWMsQ0F5RDFCO0FBekRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICxPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXIgLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG4vL2ltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2FwcC9zaGFyZWRcIjtcbmltcG9ydCAqIGFzIHRuc09BdXRoTW9kdWxlIGZyb20gJ25hdGl2ZXNjcmlwdC1vYXV0aCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWtiLWxvZ2luJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG4gICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7IFxuICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW49dHJ1ZTtcbiAgIH1cblxuXG50b2tlbjpzdHJpbmc7XG5cbiAgIFxuICAgc2F2ZVRva2VuKClcbiAgIHtcblxuICAgfVxuXG4gICAgdHJ5TG9naW4oKSB7XG4gICAgICAgIGlmIChoYXNLZXkoXCJhY2Nlc3N0b2tlblwiKSkge1xuICAgICAgICAgICAgdG5zT0F1dGhNb2R1bGUuZW5zdXJlVmFsaWRUb2tlbigpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2VuOiAnICsgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG5zT0F1dGhNb2R1bGUuYWNjZXNzVG9rZW4oKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiLCB0aGlzLnRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibWFuYWdlclwiXSk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3IgXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiZXJyb3Igd2hpbGUgdmFsaWRhdGlvbi4gTG9nZ2luZyBpbiBhZ2FpblwiICsgZXIpXG4gICAgICAgICAgICAgICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ291dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoXCJhY2Nlc3NUb2tlbiBcIiArIHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpO1xuICAgICAgICAgICAgICAgIHNldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIsIHRoaXMudG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yIGR1cmluZyBsb2dpblwiICsgZXIpO1xuICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nIHdpdGggdGhlIGVycm9yIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgXG4gICAgfVxufVxuIl19