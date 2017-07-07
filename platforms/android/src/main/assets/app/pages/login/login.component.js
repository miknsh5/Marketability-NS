"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
//import { AuthService } from "../../../app/shared";
var tnsOAuthModule = require("nativescript-oauth");
var LoginComponent = (function () {
    //constructor(private auth: AuthService, private router: Router) { }
    function LoginComponent(router) {
        this.router = router;
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
    __metadata("design:paramtypes", [router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUE0RDtBQUU1RCw2REFVOEI7QUFDOUIsb0RBQW9EO0FBQ3BELG1EQUFxRDtBQU9yRCxJQUFhLGNBQWM7SUFFdkIsb0VBQW9FO0lBQ3JFLHdCQUFxQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFNeEMsa0NBQVMsR0FBVDtJQUdBLENBQUM7SUFFQSxpQ0FBUSxHQUFSO1FBQUEsaUJBcUJDO1FBcEJHLEVBQUUsQ0FBQyxDQUFDLDZCQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDNUIsSUFBSSxDQUFDLFVBQUMsS0FBYTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUUxQyxnQ0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV0QyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUMsRUFBRTtnQkFDTiw4QkFBOEI7Z0JBQzlCLEtBQUssQ0FBQywwQ0FBMEMsR0FBRyxFQUFFLENBQUMsQ0FBQTtnQkFDdEQsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBQUEsaUJBYUM7UUFaRyxjQUFjLENBQUMsS0FBSyxFQUFFO2FBQ2pCLElBQUksQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUMsZ0NBQVMsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ04sS0FBSyxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLDhCQUE4QjtRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFHRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3RFLENBQUM7cUNBSThCLGVBQU07R0FIekIsY0FBYyxDQXVEMUI7QUF2RFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbi8vaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NoYXJlZFwiO1xyXG5pbXBvcnQgKiBhcyB0bnNPQXV0aE1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtb2F1dGgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1sb2dpbicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICAvL2NvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG4gICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG5cclxudG9rZW46c3RyaW5nO1xyXG5cclxuICAgXHJcbiAgIHNhdmVUb2tlbigpXHJcbiAgIHtcclxuXHJcbiAgIH1cclxuXHJcbiAgICB0cnlMb2dpbigpIHtcclxuICAgICAgICBpZiAoaGFzS2V5KFwiYWNjZXNzdG9rZW5cIikpIHtcclxuICAgICAgICAgICAgdG5zT0F1dGhNb2R1bGUuZW5zdXJlVmFsaWRUb2tlbigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b2tlbjogJyArIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG5zT0F1dGhNb2R1bGUuYWNjZXNzVG9rZW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwiYWNjZXNzdG9rZW5cIiwgdGhpcy50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wibWFuYWdlclwiXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZyB3aXRoIHRoZSBlcnJvciBcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yIHdoaWxlIHZhbGlkYXRpb24uIExvZ2dpbmcgaW4gYWdhaW5cIiArIGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ291dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoXCJhY2Nlc3NUb2tlbiBcIiArIHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiLCB0aGlzLnRva2VuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yIGR1cmluZyBsb2dpblwiICsgZXIpO1xyXG4gICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3IgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBcclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=