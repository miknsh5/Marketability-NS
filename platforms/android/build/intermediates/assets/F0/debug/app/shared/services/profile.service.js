"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var tnsOAuthModule = require("nativescript-oauth");
var application_settings_1 = require("application-settings");
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
        this.profileUrl = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,location,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token=";
    }
    ProfileService.prototype.getProfile = function (token) {
        var _this = this;
        tnsOAuthModule.ensureValidToken()
            .then(function (token) {
            console.log('token: ' + token);
            token = tnsOAuthModule.accessToken();
            application_settings_1.setString("accesstoken", token);
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Host", "api.linkedin.com");
            headers.append("X-Target-URI", "https://api.linkedin.com");
            headers.append("Connection", "Keep-Alive");
            return _this.http.get(_this.profileUrl + token + "&format=json").map(function (result) { return result.json(); });
        })
            .catch(function (er) {
            //do something with the error 
            alert("invalid token.Please login again");
            //  return this.http.get(this.profileUrl + token + "&format=json").map(result => result.json());
        });
        //  alert("token rec by service is "+token);
        return this.http.get(this.profileUrl + token + "&format=json").map(function (result) { return result.json(); });
    };
    return ProfileService;
}());
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCxtREFBcUQ7QUFDckQsNkRBVThCO0FBRTlCLElBQWEsY0FBYztJQUV6Qix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFEOUIsZUFBVSxHQUFXLHEzQkFBcTNCLENBQUM7SUFDejJCLENBQUM7SUFFbkMsbUNBQVUsR0FBVixVQUFXLEtBQWE7UUFBeEIsaUJBdUJDO1FBdEJDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRTthQUM5QixJQUFJLENBQUMsVUFBQyxLQUFhO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQy9CLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsZ0NBQVMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQzlGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEVBQUU7WUFDUiw4QkFBOEI7WUFDOUIsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFFMUMsZ0dBQWdHO1FBQ2xHLENBQUMsQ0FBQyxDQUFDO1FBQ0wsNENBQTRDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7SUFFOUYsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixjQUFjLENBNEIxQjtBQTVCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgKiBhcyB0bnNPQXV0aE1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtb2F1dGgnO1xyXG5pbXBvcnQge1xyXG4gIGdldEJvb2xlYW4sXHJcbiAgc2V0Qm9vbGVhbixcclxuICBnZXROdW1iZXIsXHJcbiAgc2V0TnVtYmVyLFxyXG4gIGdldFN0cmluZyxcclxuICBzZXRTdHJpbmcsXHJcbiAgaGFzS2V5LFxyXG4gIHJlbW92ZSxcclxuICBjbGVhclxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlU2VydmljZSB7XHJcbiAgcHJvZmlsZVVybDogc3RyaW5nID0gXCJodHRwczovL2FwaS5saW5rZWRpbi5jb20vdjEvcGVvcGxlL346KGlkLGZpcnN0LW5hbWUsbGFzdC1uYW1lLGxvY2F0aW9uLGhlYWRsaW5lLHBpY3R1cmUtdXJsLGluZHVzdHJ5LHN1bW1hcnksc3BlY2lhbHRpZXMscG9zaXRpb25zOihpZCx0aXRsZSxzdW1tYXJ5LHN0YXJ0LWRhdGUsZW5kLWRhdGUsaXMtY3VycmVudCxjb21wYW55OihpZCxuYW1lLHR5cGUsc2l6ZSxpbmR1c3RyeSx0aWNrZXIpKSxlZHVjYXRpb25zOihpZCxzY2hvb2wtbmFtZSxmaWVsZC1vZi1zdHVkeSxzdGFydC1kYXRlLGVuZC1kYXRlLGRlZ3JlZSxhY3Rpdml0aWVzLG5vdGVzKSxhc3NvY2lhdGlvbnMsaW50ZXJlc3RzLG51bS1yZWNvbW1lbmRlcnMsZGF0ZS1vZi1iaXJ0aCxwdWJsaWNhdGlvbnM6KGlkLHRpdGxlLHB1Ymxpc2hlcjoobmFtZSksYXV0aG9yczooaWQsbmFtZSksZGF0ZSx1cmwsc3VtbWFyeSkscGF0ZW50czooaWQsdGl0bGUsc3VtbWFyeSxudW1iZXIsc3RhdHVzOihpZCxuYW1lKSxvZmZpY2U6KG5hbWUpLGludmVudG9yczooaWQsbmFtZSksZGF0ZSx1cmwpLGxhbmd1YWdlczooaWQsbGFuZ3VhZ2U6KG5hbWUpLHByb2ZpY2llbmN5OihsZXZlbCxuYW1lKSksc2tpbGxzOihpZCxza2lsbDoobmFtZSkpLGNlcnRpZmljYXRpb25zOihpZCxuYW1lLGF1dGhvcml0eToobmFtZSksbnVtYmVyLHN0YXJ0LWRhdGUsZW5kLWRhdGUpLGNvdXJzZXM6KGlkLG5hbWUsbnVtYmVyKSxyZWNvbW1lbmRhdGlvbnMtcmVjZWl2ZWQ6KGlkLHJlY29tbWVuZGF0aW9uLXR5cGUscmVjb21tZW5kYXRpb24tdGV4dCxyZWNvbW1lbmRlciksaG9ub3JzLWF3YXJkcyx0aHJlZS1jdXJyZW50LXBvc2l0aW9ucyx0aHJlZS1wYXN0LXBvc2l0aW9ucyx2b2x1bnRlZXIpP29hdXRoMl9hY2Nlc3NfdG9rZW49XCI7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuXHJcbiAgZ2V0UHJvZmlsZSh0b2tlbjogc3RyaW5nKSB7XHJcbiAgICB0bnNPQXV0aE1vZHVsZS5lbnN1cmVWYWxpZFRva2VuKClcclxuICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygndG9rZW46ICcgKyB0b2tlbik7XHJcbiAgICAgICAgdG9rZW4gPSB0bnNPQXV0aE1vZHVsZS5hY2Nlc3NUb2tlbigpO1xyXG4gICAgICAgIHNldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIsIHRva2VuKTtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiSG9zdFwiLCBcImFwaS5saW5rZWRpbi5jb21cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJYLVRhcmdldC1VUklcIiwgXCJodHRwczovL2FwaS5saW5rZWRpbi5jb21cIik7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb25uZWN0aW9uXCIsIFwiS2VlcC1BbGl2ZVwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnByb2ZpbGVVcmwgKyB0b2tlbiArIFwiJmZvcm1hdD1qc29uXCIpLm1hcChyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXIpID0+IHtcclxuICAgICAgICAvL2RvIHNvbWV0aGluZyB3aXRoIHRoZSBlcnJvciBcclxuICAgICAgICBhbGVydChcImludmFsaWQgdG9rZW4uUGxlYXNlIGxvZ2luIGFnYWluXCIpO1xyXG5cclxuICAgICAgICAvLyAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5wcm9maWxlVXJsICsgdG9rZW4gKyBcIiZmb3JtYXQ9anNvblwiKS5tYXAocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xyXG4gICAgICB9KTtcclxuICAgIC8vICBhbGVydChcInRva2VuIHJlYyBieSBzZXJ2aWNlIGlzIFwiK3Rva2VuKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnByb2ZpbGVVcmwgKyB0b2tlbiArIFwiJmZvcm1hdD1qc29uXCIpLm1hcChyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XHJcblxyXG4gIH1cclxufSJdfQ==