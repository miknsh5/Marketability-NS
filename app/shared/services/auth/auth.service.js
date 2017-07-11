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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLGtEQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsNkNBQTRDO0FBTTVDLElBQWEsV0FBVztJQUlwQixxQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsRUFBRSx5QkFBVyxDQUFDLE1BQU0sRUFBRTtZQUVoRSxTQUFTLEVBQUUsZUFBZTtZQUMxQixrQkFBa0IsRUFBRTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsS0FBSzthQUVkO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDaEMsaUJBQWlCLEVBQUUsS0FBSztTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8scUNBQWUsR0FBdkI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLFVBQVU7WUFFckMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDSSxzQ0FBc0M7SUFDMUMsQ0FBQztJQUVPLGtDQUFZLEdBQXBCO1FBQ0ksbUVBQW1FO1FBQ25FLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXhERCxJQXdEQztBQXhEWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBS21CLGVBQU07R0FKekIsV0FBVyxDQXdEdkI7QUF4RFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyB0b2tlbk5vdEV4cGlyZWQgfSBmcm9tICdhbmd1bGFyMi1qd3QnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XG5pbXBvcnQgeyBQcm9maWxlLCBTa2lsbCwgRXhwZXJpZW5jZSwgUGVyc29uUHJvZmlsZSwgQ29tcGFueUluZm8gfSBmcm9tICcuLi8uLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIEF1dGgwTG9jazogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gICAgbG9jazogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuXG4gICAgICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soQVVUSF9DT05GSUcuY2xpZW50SUQsIEFVVEhfQ09ORklHLmRvbWFpbiwge1xuXG4gICAgICAgICAgICBjb250YWluZXI6ICdhdXRoLXByb3ZpZGVyJyxcbiAgICAgICAgICAgIGxhbmd1YWdlRGljdGlvbmFyeToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGVtZToge1xuICAgICAgICAgICAgICAgIGxvZ286IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vIHByaW1hcnlDb2xvcjogXCIjNjA3RDhCXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93ZWRDb25uZWN0aW9uczogWydsaW5rZWRpbiddLFxuICAgICAgICAgICAgcmVtZW1iZXJMYXN0TG9naW46IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub25BdXRoZW50aWNhdGVkKCk7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMubG9jay5zaG93KHsgaW5pdGlhbFNjcmVlbjogJ2xvZ2luJyB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgdGhpcy5sb2NrLm9uKCdhdXRoZW50aWNhdGVkJywgKGF1dGhSZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgYXV0aFJlc3VsdC5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoUmVzdWx0LmlkVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5sb2NrLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoJy9ob21lJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgLy8gcmV0dXJuIHRva2VuTm90RXhwaXJlZCgnaWRfdG9rZW4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyU3RvcmFnZSgpIHtcbiAgICAgICAgLy8gVG8gbG9nIG91dCwganVzdCByZW1vdmUgdGhlIHRva2VuIGFuZCBwcm9maWxlIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG5cbiAgICAgICAgLy8gU2VuZCB0aGUgdXNlciBiYWNrIHRvIHRoZSBMb2dpbiBhZnRlciBsb2dvdXRcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCgnL2xvZ2luJyk7XG4gICAgfVxufVxuIl19