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
        this.tokenRecieved = false;
    }
    LoginComponent.prototype.Profile = function () {
        var _this = this;
        tnsOAuthModule.login()
            .then(function () {
            console.log('logged in');
            console.dir("accessToken " + tnsOAuthModule.accessToken());
            _this.token = tnsOAuthModule.accessToken();
            application_settings_1.setString("accesstoken", _this.token);
            _this.router.navigate(["manager"]);
            _this.tokenRecieved = true;
            //console.log(this.token);
            //alert(tnsOAuthModule.accessToken());
            /*let navigationExtras: NavigationExtras = {
                queryParams: {
                    "accesstoken": this.token
                    
                }
            };*/
            // this.router.navigate(["manager"],navigationExtras);
        })
            .catch(function (er) {
            alert(er);
            //do something with the error 
        });
        if (this.tokenRecieved === false) {
            if (application_settings_1.hasKey("accesstoken")) {
                this.router.navigate(["manager"]);
            }
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        // alert("Login Page");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUE0RDtBQUU1RCw2REFVOEI7QUFDOUIsb0RBQW9EO0FBQ3BELG1EQUFxRDtBQU9yRCxJQUFhLGNBQWM7SUFFdkIsb0VBQW9FO0lBQ3JFLHdCQUFxQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUl0QyxrQkFBYSxHQUFTLEtBQUssQ0FBQztJQUpjLENBQUM7SUFNeEMsZ0NBQU8sR0FBUDtRQUFBLGlCQWdDQztRQTlCRyxjQUFjLENBQUMsS0FBSyxFQUFFO2FBQ3hCLElBQUksQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDM0QsS0FBSSxDQUFDLEtBQUssR0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsZ0NBQVMsQ0FBQyxhQUFhLEVBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsYUFBYSxHQUFFLElBQUksQ0FBQztZQUMxQiwwQkFBMEI7WUFDMUIsc0NBQXNDO1lBQ3RDOzs7OztnQkFLSTtZQUVQLHNEQUFzRDtRQUN2RCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ0osS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1osOEJBQThCO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0EsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLDZCQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNMLENBQUM7SUFHTCxDQUFDO0lBQ0EsaUNBQVEsR0FBUjtRQUNJLHVCQUF1QjtRQUd4Qjs7OztZQUlJO0lBQ1AsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEWSxjQUFjO0lBTDFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixXQUFXLEVBQUUsd0JBQXdCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO0tBQ3RFLENBQUM7cUNBSThCLGVBQU07R0FIekIsY0FBYyxDQW9EMUI7QUFwRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbi8vaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NoYXJlZFwiO1xyXG5pbXBvcnQgKiBhcyB0bnNPQXV0aE1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtb2F1dGgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1sb2dpbicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICAvL2NvbnN0cnVjdG9yKHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG4gICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XHJcblxyXG5cclxudG9rZW46c3RyaW5nO1xyXG50b2tlblJlY2lldmVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgIFxyXG4gICBQcm9maWxlKClcclxuICAgeyAgXHJcbiAgICAgICB0bnNPQXV0aE1vZHVsZS5sb2dpbigpXHJcbiAgICAudGhlbigoKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2dnZWQgaW4nKTtcclxuICAgICAgICBjb25zb2xlLmRpcihcImFjY2Vzc1Rva2VuIFwiICsgdG5zT0F1dGhNb2R1bGUuYWNjZXNzVG9rZW4oKSk7XHJcbiAgICAgICAgdGhpcy50b2tlbj10bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpO1xyXG4gICAgICAgIHNldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIsdGhpcy50b2tlbik7XHJcbiAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1hbmFnZXJcIl0pO1xyXG4gICAgICAgICB0aGlzLnRva2VuUmVjaWV2ZWQ9IHRydWU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnRva2VuKTtcclxuICAgICAgICAvL2FsZXJ0KHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCkpO1xyXG4gICAgICAgIC8qbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjY2Vzc3Rva2VuXCI6IHRoaXMudG9rZW5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTsqL1xyXG5cclxuICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYW5hZ2VyXCJdLG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXIpPT57XHJcbiAgICAgICAgICBhbGVydChlcik7XHJcbiAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3IgXHJcbiAgICB9KTtcclxuICAgICAgIGlmICh0aGlzLnRva2VuUmVjaWV2ZWQ9PT1mYWxzZSkge1xyXG4gICAgICAgICAgIGlmIChoYXNLZXkoXCJhY2Nlc3N0b2tlblwiKSkge1xyXG4gICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYW5hZ2VyXCJdKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcblxyXG4gXHJcbiAgIH1cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiTG9naW4gUGFnZVwiKTtcclxuICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAvKiBpZiAodGhpcy5hdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaG9tZSddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGgubG9naW4oKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxufVxyXG4iXX0=