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
    function LoginComponent(router, page, zone) {
        this.router = router;
        this.page = page;
        this.zone = zone;
        this.page.actionBarHidden = true;
    }
    LoginComponent.prototype.tryLogin = function () {
        var _this = this;
        if (application_settings_1.hasKey("accesstoken")) {
            tnsOAuthModule.ensureValidToken()
                .then(function (token) {
                console.log('token: ' + token);
                _this.token = tnsOAuthModule.accessToken();
                application_settings_1.setString("accesstoken", _this.token);
                // this.zone.run(() => {
                _this.router.navigate(["home"]);
                // });
            })
                .catch(function (er) {
                //do something with the error 
                alert("error while validation. Logging in again");
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
            // this.zone.run(() => {
            _this.router.navigate(["home"]);
            // });
        })
            .catch(function (er) {
            alert("error during login" + er);
            //do something with the error 
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'mkb-login',
        templateUrl: 'pages/login/login.html',
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, page_1.Page, core_1.NgZone])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBRTFELDBDQUEyRDtBQUMzRCxnQ0FBK0I7QUFDL0IsNkRBVThCO0FBQzlCLG9EQUFvRDtBQUNwRCxtREFBcUQ7QUFPckQsSUFBYSxjQUFjO0lBSXZCLG9FQUFvRTtJQUNwRSx3QkFBb0IsTUFBYyxFQUFVLElBQVUsRUFBVSxJQUFZO1FBQXhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFzQkM7UUFyQkcsRUFBRSxDQUFDLENBQUMsNkJBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsY0FBYyxDQUFDLGdCQUFnQixFQUFFO2lCQUM1QixJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRTFDLGdDQUFTLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsd0JBQXdCO2dCQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFDVCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUMsRUFBRTtnQkFDTiw4QkFBOEI7Z0JBQzlCLEtBQUssQ0FBQywwQ0FBMEMsQ0FBRSxDQUFBO2dCQUNsRCxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFBQSxpQkFlQztRQWRHLGNBQWMsQ0FBQyxLQUFLLEVBQUU7YUFDakIsSUFBSSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxnQ0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsd0JBQXdCO1lBQ25CLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNO1FBQ1QsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsRUFBRTtZQUNOLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqQyw4QkFBOEI7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLGNBQWM7SUFMMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7S0FDdkUsQ0FBQztxQ0FNOEIsZUFBTSxFQUFnQixXQUFJLEVBQWdCLGFBQU07R0FMbkUsY0FBYyxDQWlEMUI7QUFqRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbi8vaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NoYXJlZFwiO1xyXG5pbXBvcnQgKiBhcyB0bnNPQXV0aE1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtb2F1dGgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1sb2dpbicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XHJcblxyXG4gICAgdG9rZW46IHN0cmluZztcclxuXHJcbiAgICAvL2NvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeUxvZ2luKCkge1xyXG4gICAgICAgIGlmIChoYXNLZXkoXCJhY2Nlc3N0b2tlblwiKSkge1xyXG4gICAgICAgICAgICB0bnNPQXV0aE1vZHVsZS5lbnN1cmVWYWxpZFRva2VuKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2VuOiAnICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiLCB0aGlzLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJob21lXCJdKTtcclxuICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZyB3aXRoIHRoZSBlcnJvciBcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcImVycm9yIHdoaWxlIHZhbGlkYXRpb24uIExvZ2dpbmcgaW4gYWdhaW5cIiApXHJcbiAgICAgICAgICAgICAgICAgICAgdG5zT0F1dGhNb2R1bGUubG9nb3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoXCJhY2Nlc3NUb2tlbiBcIiArIHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiLCB0aGlzLnRva2VuKTtcclxuICAgICAgICAgICAgICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSk7XHJcbiAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImVycm9yIGR1cmluZyBsb2dpblwiICsgZXIpO1xyXG4gICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3IgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==