"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { AuthService } from "../../../app/shared";
var LoginComponent = (function () {
    //constructor(private auth: AuthService, private router: Router) { }
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.Profile = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDBDQUF5QztBQUV6QyxvREFBb0Q7QUFRcEQsSUFBYSxjQUFjO0lBRXZCLG9FQUFvRTtJQUNyRSx3QkFBcUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBQ3hDLGdDQUFPLEdBQVA7UUFFRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNBLGlDQUFRLEdBQVI7UUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckI7Ozs7WUFJSTtJQUNQLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHdCQUF3QjtRQUN0QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztLQUN0RSxDQUFDO3FDQUk4QixlQUFNO0dBSHpCLGNBQWMsQ0FpQjFCO0FBakJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICxPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbi8vaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NoYXJlZFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItbG9naW4nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCIsIFwicGFnZXMvbG9naW4vbG9naW4uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgLy9jb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuICAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG4gICBQcm9maWxlKClcclxuICAge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYW5hZ2VyXCJdKTtcclxuICAgfVxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgYWxlcnQoXCJMb2dpbiBQYWdlXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICAvKiBpZiAodGhpcy5hdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaG9tZSddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGgubG9naW4oKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxufVxyXG4iXX0=