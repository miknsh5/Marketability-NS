"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
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
        return angular2_jwt_1.tokenNotExpired('id_token');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUErQztBQUMvQywwQ0FBeUM7QUFDekMsNkNBQTRDO0FBTTVDLElBQWEsV0FBVztJQUlwQixxQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRTtZQUVoRSxTQUFTLEVBQUUsZUFBZTtZQUMxQixrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUVkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDaEMsaUJBQWlCLEVBQUUsS0FBSztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8scUNBQWUsR0FBdkI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLFVBQVU7WUFFckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDSSxNQUFNLENBQUMsOEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sa0NBQVksR0FBcEI7UUFDSSxtRUFBbUU7UUFDbkUsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBeERZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FLbUIsZUFBTTtHQUp6QixXQUFXLENBd0R2QjtBQXhEWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdG9rZW5Ob3RFeHBpcmVkIH0gZnJvbSAnYW5ndWxhcjItand0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQVVUSF9DT05GSUcgfSBmcm9tICcuL2F1dGguY29uZmlnJztcclxuaW1wb3J0IHsgUHJvZmlsZSwgU2tpbGwsIEV4cGVyaWVuY2UsIFBlcnNvblByb2ZpbGUsIENvbXBhbnlJbmZvIH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgQXV0aDBMb2NrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcblxyXG4gICAgbG9jazogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIX0NPTkZJRy5jbGllbnRJRCwgQVVUSF9DT05GSUcuZG9tYWluLCB7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXI6ICdhdXRoLXByb3ZpZGVyJyxcclxuICAgICAgICAgICAgbGFuZ3VhZ2VEaWN0aW9uYXJ5OiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRoZW1lOiB7XHJcbiAgICAgICAgICAgICAgICBsb2dvOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIHByaW1hcnlDb2xvcjogXCIjNjA3RDhCXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXV0aDoge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbGxvd2VkQ29ubmVjdGlvbnM6IFsnbGlua2VkaW4nXSxcclxuICAgICAgICAgICAgcmVtZW1iZXJMYXN0TG9naW46IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMub25BdXRoZW50aWNhdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN0b3JhZ2UoKTtcclxuICAgICAgICB0aGlzLmxvY2suc2hvdyh7IGluaXRpYWxTY3JlZW46ICdsb2dpbicgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkF1dGhlbnRpY2F0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2NrLm9uKCdhdXRoZW50aWNhdGVkJywgKGF1dGhSZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGF1dGhSZXN1bHQuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoUmVzdWx0LmlkVG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2suaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvaG9tZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcclxuICAgICAgICByZXR1cm4gdG9rZW5Ob3RFeHBpcmVkKCdpZF90b2tlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJTdG9yYWdlKCkge1xyXG4gICAgICAgIC8vIFRvIGxvZyBvdXQsIGp1c3QgcmVtb3ZlIHRoZSB0b2tlbiBhbmQgcHJvZmlsZSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN0b3JhZ2UoKTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCB0aGUgdXNlciBiYWNrIHRvIHRoZSBMb2dpbiBhZnRlciBsb2dvdXRcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvbG9naW4nKTtcclxuICAgIH1cclxufVxyXG4iXX0=