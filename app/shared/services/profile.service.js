"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
    }
    ProfileService.prototype.getProfile = function (token) {
        alert("token rec by service is " + token);
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get("https://api.linkedin.com/v1/people/~?oauth2_access_token=" + token + "&format=json").map(function (result) { return result.json(); });
    };
    return ProfileService;
}());
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCxJQUFhLGNBQWM7SUFDM0Isd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUNsQyxtQ0FBVSxHQUFWLFVBQVcsS0FBYTtRQUVwQixLQUFLLENBQUMsMEJBQTBCLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUN4QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywyREFBMkQsR0FBQyxLQUFLLEdBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFFLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBRWxJLENBQUM7SUFDRCxxQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksY0FBYztJQUQxQixpQkFBVSxFQUFFO3FDQUVhLFdBQUk7R0FEakIsY0FBYyxDQVUxQjtBQVZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVTZXJ2aWNlIHtcclxuY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxyXG5nZXRQcm9maWxlKHRva2VuOiBzdHJpbmcgKVxyXG57XHJcbiAgICBhbGVydChcInRva2VuIHJlYyBieSBzZXJ2aWNlIGlzIFwiK3Rva2VuKTtcclxubGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5yZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vYXBpLmxpbmtlZGluLmNvbS92MS9wZW9wbGUvfj9vYXV0aDJfYWNjZXNzX3Rva2VuPVwiK3Rva2VuK1wiJmZvcm1hdD1qc29uXCIpLm1hcChyZXN1bHQ9PnJlc3VsdC5qc29uKCkpO1xyXG5cclxufVxyXG59XHJcbiJdfQ==