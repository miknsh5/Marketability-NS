"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { tokenNotExpired } from 'angular2-jwt';
var router_1 = require("@angular/router");
var auth_config_1 = require("./auth.config");
var AuthService = (function () {
    function AuthService(router) {
        this.router = router;
        this.lock = new Auth0Lock(auth_config_1.AUTH_CONFIG.clientID, auth_config_1.AUTH_CONFIG.domain, {
            container: 'auth-provider',
            languageDictionary: {
                title: '',
            },
            theme: {
                logo: false,
            },
            auth: {
                redirect: false,
            },
            allowedConnections: ['linkedin'],
            rememberLastLogin: false
        });
        this.onAuthenticated();
    }
    AuthService.prototype.login = function () {
        this.clearStorage();
        this.lock.show({ initialScreen: 'login' });
    };
    AuthService.prototype.onAuthenticated = function () {
        var _this = this;
        this.lock.on('authenticated', function (authResult) {
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            _this.lock.hide();
            _this.router.navigateByUrl('/home');
        });
    };
    AuthService.prototype.isAuthenticated = function () {
        // return tokenNotExpired('id_token');
    };
    AuthService.prototype.clearStorage = function () {
        // To log out, just remove the token and profile from local storage
        localStorage.clear();
    };
    AuthService.prototype.logout = function () {
        this.clearStorage();
        // Send the user back to the Login after logout
        this.router.navigateByUrl('/login');
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLGtEQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsNkNBQTRDO0FBTTVDLElBQWEsV0FBVztJQUlwQixxQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRTtZQUVoRSxTQUFTLEVBQUUsZUFBZTtZQUMxQixrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUVkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDaEMsaUJBQWlCLEVBQUUsS0FBSztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8scUNBQWUsR0FBdkI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLFVBQVU7WUFFckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDSSxzQ0FBc0M7SUFDMUMsQ0FBQztJQUVPLGtDQUFZLEdBQXBCO1FBQ0ksbUVBQW1FO1FBQ25FLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXhERCxJQXdEQztBQXhEWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBS21CLGVBQU07R0FKekIsV0FBVyxDQXdEdkI7QUF4RFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGltcG9ydCB7IHRva2VuTm90RXhwaXJlZCB9IGZyb20gJ2FuZ3VsYXIyLWp3dCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XHJcbmltcG9ydCB7IFByb2ZpbGUsIFNraWxsLCBFeHBlcmllbmNlLCBQZXJzb25Qcm9maWxlLCBDb21wYW55SW5mbyB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuXHJcbmRlY2xhcmUgdmFyIEF1dGgwTG9jazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGxvY2s6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soQVVUSF9DT05GSUcuY2xpZW50SUQsIEFVVEhfQ09ORklHLmRvbWFpbiwge1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyOiAnYXV0aC1wcm92aWRlcicsXHJcbiAgICAgICAgICAgIGxhbmd1YWdlRGljdGlvbmFyeToge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGVtZToge1xyXG4gICAgICAgICAgICAgICAgbG9nbzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBwcmltYXJ5Q29sb3I6IFwiIzYwN0Q4QlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dGg6IHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWxsb3dlZENvbm5lY3Rpb25zOiBbJ2xpbmtlZGluJ10sXHJcbiAgICAgICAgICAgIHJlbWVtYmVyTGFzdExvZ2luOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm9uQXV0aGVudGljYXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5sb2NrLnNob3coeyBpbml0aWFsU2NyZWVuOiAnbG9naW4nIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BdXRoZW50aWNhdGVkKCkge1xyXG4gICAgICAgIHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIChhdXRoUmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBhdXRoUmVzdWx0LmFjY2Vzc1Rva2VuKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aFJlc3VsdC5pZFRva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrLmhpZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnL2hvbWUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XHJcbiAgICAgICAgLy8gcmV0dXJuIHRva2VuTm90RXhwaXJlZCgnaWRfdG9rZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyU3RvcmFnZSgpIHtcclxuICAgICAgICAvLyBUbyBsb2cgb3V0LCBqdXN0IHJlbW92ZSB0aGUgdG9rZW4gYW5kIHByb2ZpbGUgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGhlIHVzZXIgYmFjayB0byB0aGUgTG9naW4gYWZ0ZXIgbG9nb3V0XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnL2xvZ2luJyk7XHJcbiAgICB9XHJcbn1cclxuIl19