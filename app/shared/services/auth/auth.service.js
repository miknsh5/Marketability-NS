"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { tokenNotExpired } from 'angular2-jwt';
var router_1 = require("@angular/router");
var auth_config_1 = require("./auth.config");
var AuthService = (function () {
    function AuthService(router, zone) {
        this.router = router;
        this.zone = zone;
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
            _this.zone.run(function () {
                _this.router.navigateByUrl('/home');
            });
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
    __metadata("design:paramtypes", [router_1.Router, core_1.NgZone])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELGtEQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsNkNBQTRDO0FBTTVDLElBQWEsV0FBVztJQUlwQixxQkFBb0IsTUFBYyxFQUFVLElBQVk7UUFBcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFFcEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRTtZQUVoRSxTQUFTLEVBQUUsZUFBZTtZQUMxQixrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUVkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDaEMsaUJBQWlCLEVBQUUsS0FBSztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8scUNBQWUsR0FBdkI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLFVBQVU7WUFFckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWpCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNJLHNDQUFzQztJQUMxQyxDQUFDO0lBRU8sa0NBQVksR0FBcEI7UUFDSSxtRUFBbUU7UUFDbkUsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBM0RELElBMkRDO0FBM0RZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FLbUIsZUFBTSxFQUFnQixhQUFNO0dBSi9DLFdBQVcsQ0EyRHZCO0FBM0RZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGltcG9ydCB7IHRva2VuTm90RXhwaXJlZCB9IGZyb20gJ2FuZ3VsYXIyLWp3dCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XHJcbmltcG9ydCB7IFByb2ZpbGUsIFNraWxsLCBFeHBlcmllbmNlLCBQZXJzb25Qcm9maWxlLCBDb21wYW55SW5mbyB9IGZyb20gJy4uLy4uL2luZGV4JztcclxuXHJcbmRlY2xhcmUgdmFyIEF1dGgwTG9jazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIGxvY2s6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG5cclxuICAgICAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKEFVVEhfQ09ORklHLmNsaWVudElELCBBVVRIX0NPTkZJRy5kb21haW4sIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2F1dGgtcHJvdmlkZXInLFxyXG4gICAgICAgICAgICBsYW5ndWFnZURpY3Rpb25hcnk6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhlbWU6IHtcclxuICAgICAgICAgICAgICAgIGxvZ286IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gcHJpbWFyeUNvbG9yOiBcIiM2MDdEOEJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFsbG93ZWRDb25uZWN0aW9uczogWydsaW5rZWRpbiddLFxyXG4gICAgICAgICAgICByZW1lbWJlckxhc3RMb2dpbjogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkF1dGhlbnRpY2F0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmNsZWFyU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMubG9jay5zaG93KHsgaW5pdGlhbFNjcmVlbjogJ2xvZ2luJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQXV0aGVudGljYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmxvY2sub24oJ2F1dGhlbnRpY2F0ZWQnLCAoYXV0aFJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgYXV0aFJlc3VsdC5hY2Nlc3NUb2tlbik7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMubG9jay5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnL2hvbWUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdXRoZW50aWNhdGVkKCkge1xyXG4gICAgICAgIC8vIHJldHVybiB0b2tlbk5vdEV4cGlyZWQoJ2lkX3Rva2VuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclN0b3JhZ2UoKSB7XHJcbiAgICAgICAgLy8gVG8gbG9nIG91dCwganVzdCByZW1vdmUgdGhlIHRva2VuIGFuZCBwcm9maWxlIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyU3RvcmFnZSgpO1xyXG5cclxuICAgICAgICAvLyBTZW5kIHRoZSB1c2VyIGJhY2sgdG8gdGhlIExvZ2luIGFmdGVyIGxvZ291dFxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy9sb2dpbicpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==