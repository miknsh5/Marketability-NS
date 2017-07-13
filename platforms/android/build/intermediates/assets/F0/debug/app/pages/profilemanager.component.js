"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
require("rxjs/Rx");
var index_1 = require("../shared/index");
var ProfileManagerComponent = (function () {
    function ProfileManagerComponent(marketabilityService, profileService, router, profileData, zone) {
        this.marketabilityService = marketabilityService;
        this.profileService = profileService;
        this.router = router;
        this.profileData = profileData;
        this.zone = zone;
        this.forwardNavigaton = [index_1.ProfilePage.Profile, index_1.ProfilePage.Skill,
            index_1.ProfilePage.Experience, index_1.ProfilePage.Computation, index_1.ProfilePage.Marketability];
        this.prevNavigaton = [index_1.ProfilePage.Profile, index_1.ProfilePage.Skill,
            index_1.ProfilePage.Experience, index_1.ProfilePage.Marketability];
        this.currentPage = index_1.ProfilePage.Profile;
        // this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentPage = this.forwardNavigaton[0];
        this.currentProgress = 25;
    }
    ProfileManagerComponent.prototype.ngOnInit = function () {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    };
    ProfileManagerComponent.prototype.onNextButtonClicked = function (page) {
        var currentIndex = this.forwardNavigaton.indexOf(page);
        this.currentPage = this.forwardNavigaton[currentIndex + 1];
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress + 25;
        this.navigateToCurrentPage(this.currentPage);
        // document.getElementById('progressPercent').style.width = this.currentProgress + '%';
    };
    ProfileManagerComponent.prototype.onPrevButtonClicked = function (page) {
        var currentIndex = this.prevNavigaton.indexOf(page);
        this.currentPage = this.prevNavigaton[currentIndex - 1];
        this.setPageTitle(this.currentPage);
        if (page === index_1.ProfilePage.Marketability) {
            this.currentProgress = 75;
        }
        else {
            this.currentProgress = this.currentProgress - 25;
        }
        this.setNavButtonText(this.currentPage);
        this.navigateToCurrentPage(this.currentPage);
    };
    ProfileManagerComponent.prototype.onMarketabilityCalculated = function (score) {
        this.score = score;
        this.onNextButtonClicked(index_1.ProfilePage.Computation);
    };
    ProfileManagerComponent.prototype.onLogoutButtonClicked = function () {
        // this.authService.logout();
        alert('logout button pressed...!');
    };
    ProfileManagerComponent.prototype.setPageTitle = function (page) {
        if (page === 0) {
            this.pageTitle = 'Profile';
        }
        else if (page === 1) {
            this.pageTitle = 'Skills';
        }
        else if (page === 2) {
            this.pageTitle = 'Experience';
        }
        else if (page === 3) {
            this.pageTitle = 'Computation';
        }
        else if (page === 4) {
            this.pageTitle = 'Marketability';
        }
        else {
            this.pageTitle = '';
        }
    };
    ProfileManagerComponent.prototype.setNavButtonText = function (page) {
        if (page >= index_1.ProfilePage.Experience) {
            this.navButtonText = 'Finish';
        }
        else {
            this.navButtonText = 'Next';
        }
    };
    ProfileManagerComponent.prototype.extractProfileData = function (profile) {
        // alert(profile.firstName);
        var userProfile = new index_1.PersonProfile();
        userProfile.Profile = new index_1.Profile();
        userProfile.Skills = new Array();
        userProfile.Experience = new index_1.Experience();
        userProfile.Experience.WorkExperience = new Array();
        userProfile.Profile.Name = profile.firstName + " " + profile.lastName;
        userProfile.Profile.City = profile.location.name;
        userProfile.Profile.Occupation = profile.headline;
        ['C#', 'Java', 'JavaScript', 'Python', 'Ruby On Rails'].forEach(function (elm) {
            var skill = new index_1.Skill();
            skill.SkillName = elm;
            userProfile.Skills.push(skill);
        });
        profile.positions.values.forEach(function (experience) {
            var companyInfo = new index_1.CompanyInfo();
            companyInfo.CompanyName = experience.company.name;
            companyInfo.Title = experience.title;
            companyInfo.StartDate = experience.startDate.month + ' / ' + experience.startDate.year;
            if (!experience.isCurrent) {
                companyInfo.EndDate = experience.endDate.month + ' / ' + experience.endDate.year;
            }
            else {
                companyInfo.EndDate = '';
            }
            userProfile.Experience.WorkExperience.push(companyInfo);
            userProfile.Experience.WorkExperience.push(companyInfo);
            userProfile.Experience.WorkExperience.push(companyInfo);
            userProfile.Experience.WorkExperience.push(companyInfo);
        });
        this.profileData.personProfile = userProfile;
        var profileInfo = JSON.stringify(this.profileData.personProfile);
        application_settings_1.setString("personProfile", profileInfo);
        console.log(profileInfo);
        this.navigateToCurrentPage(this.currentPage);
    };
    ProfileManagerComponent.prototype.handleError = function (error) {
        alert(error + "extractProfileData");
    };
    ProfileManagerComponent.prototype.getProfile = function () {
        var _this = this;
        // alert("get profile called");
        this.token = application_settings_1.getString("accesstoken");
        if (this.token === null) {
            //reroute to login page
        }
        this.profileService.getProfile(this.token).subscribe(function (data) { return _this.extractProfileData(data); }, function (error) { return _this.handleError(error); }, function () { return console.log("Node Added Complete"); });
    };
    ProfileManagerComponent.prototype.navigateToCurrentPage = function (currentPage) {
        var _this = this;
        switch (currentPage) {
            case index_1.ProfilePage.Profile:
                console.log('-----------navigateToCurrentPage------------');
                console.dir(this.profileData.personProfile);
                this.zone.run(function () {
                    _this.router.navigate(["manager/basicprofile"]);
                });
                break;
            case index_1.ProfilePage.Skill:
                this.router.navigate(["/skills"]);
                break;
            case index_1.ProfilePage.Experience:
                this.router.navigate(["/experience"]);
                break;
            case index_1.ProfilePage.Computation:
                this.router.navigate(["/calculation"]);
                break;
            case index_1.ProfilePage.Marketability:
                this.router.navigate(["/score", this.score]);
                break;
            default:
                this.router.navigate([""]);
                break;
        }
    };
    return ProfileManagerComponent;
}());
ProfileManagerComponent = __decorate([
    core_1.Component({
        selector: 'mkb-profilemanager',
        templateUrl: 'pages/profilemanager.html',
        providers: [index_1.MarketabilityService, index_1.ProfileService],
        styleUrls: ["pages/profilemanager-common.css", "pages/profilemanager.css"]
    }),
    __metadata("design:paramtypes", [index_1.MarketabilityService, index_1.ProfileService,
        router_1.Router, index_1.ProfileData, core_1.NgZone])
], ProfileManagerComponent);
exports.ProfileManagerComponent = ProfileManagerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBRzFELDBDQUEyRDtBQUUzRCw2REFVOEI7QUFFOUIsbUJBQWlCO0FBRWpCLHlDQUd5QjtBQVN6QixJQUFhLHVCQUF1QjtJQWtCaEMsaUNBQW9CLG9CQUEwQyxFQUFVLGNBQThCLEVBQzFGLE1BQWMsRUFBVSxXQUF3QixFQUFVLElBQVk7UUFEOUQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUMxRixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBVGxGLHFCQUFnQixHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUM5RSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLFdBQVcsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVFLGtCQUFhLEdBQXVCLENBQUMsbUJBQVcsQ0FBQyxPQUFPLEVBQUUsbUJBQVcsQ0FBQyxLQUFLO1lBQzNFLG1CQUFXLENBQUMsVUFBVSxFQUFFLG1CQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFNL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBVyxDQUFDLE9BQU8sQ0FBQztRQUN2Qyx1RUFBdUU7UUFDdkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVks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QUEyQjtRQUN4QyxTQUFTLEVBQUUsQ0FBQyw0QkFBb0IsRUFBRSxzQkFBYyxDQUFDO1FBQ2pELFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLDBCQUEwQixDQUFDO0tBQzdFLENBQUM7cUNBbUI0Qyw0QkFBb0IsRUFBMEIsc0JBQWM7UUFDbEYsZUFBTSxFQUF1QixtQkFBVyxFQUFnQixhQUFNO0dBbkJ6RSx1QkFBdUIsQ0ErS25DO0FBL0tZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBkb2NrTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGgvYXV0aC5jb25maWcnO1xyXG5pbXBvcnQge1xyXG4gICAgUGVyc29uUHJvZmlsZSwgU2tpbGwsIFByb2ZpbGUsIFByb2ZpbGVEYXRhLFxyXG4gICAgRXhwZXJpZW5jZSwgQ29tcGFueUluZm8sIFByb2ZpbGVQYWdlLCBNYXJrZXRhYmlsaXR5U2VydmljZSwgUHJvZmlsZVNlcnZpY2UsXHJcbn0gZnJvbSAnLi4vc2hhcmVkL2luZGV4JztcclxuXHJcbmRlY2xhcmUgdmFyIEF1dGgwTG9jazogYW55O1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXByb2ZpbGVtYW5hZ2VyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAncGFnZXMvcHJvZmlsZW1hbmFnZXIuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtNYXJrZXRhYmlsaXR5U2VydmljZSwgUHJvZmlsZVNlcnZpY2VdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9wcm9maWxlbWFuYWdlci1jb21tb24uY3NzXCIsIFwicGFnZXMvcHJvZmlsZW1hbmFnZXIuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlTWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgY3VycmVudFBhZ2U6IFByb2ZpbGVQYWdlO1xyXG4gICAgc2NvcmU6IHN0cmluZztcclxuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xyXG4gICAgbmF2QnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gICAgbG9jazogYW55O1xyXG4gICAgZWxlbWVudFByb2dyZXNzQmFyOiBhbnk7XHJcbiAgICBjdXJyZW50UHJvZ3Jlc3M6IG51bWJlcjtcclxuXHJcbiAgICBmb3J3YXJkTmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXHJcbiAgICBQcm9maWxlUGFnZS5FeHBlcmllbmNlLCBQcm9maWxlUGFnZS5Db21wdXRhdGlvbiwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgcHJldk5hdmlnYXRvbjogQXJyYXk8UHJvZmlsZVBhZ2U+ID0gW1Byb2ZpbGVQYWdlLlByb2ZpbGUsIFByb2ZpbGVQYWdlLlNraWxsLFxyXG4gICAgUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgdG9rZW46IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcmtldGFiaWxpdHlTZXJ2aWNlOiBNYXJrZXRhYmlsaXR5U2VydmljZSwgcHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBwcm9maWxlRGF0YTogUHJvZmlsZURhdGEsIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFByb2ZpbGVQYWdlLlByb2ZpbGU7XHJcbiAgICAgICAgLy8gdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIX0NPTkZJRy5jbGllbnRJRCwgQVVUSF9DT05GSUcuZG9tYWluKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uWzBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9maWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmZvcndhcmROYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uW2N1cnJlbnRJbmRleCArIDFdO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgMjU7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvQ3VycmVudFBhZ2UodGhpcy5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblByZXZCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMucHJldk5hdmlnYXRvbi5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnByZXZOYXZpZ2F0b25bY3VycmVudEluZGV4IC0gMV07XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlID09PSBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gNzU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyAtIDI1O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvQ3VycmVudFBhZ2UodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXRhYmlsaXR5Q2FsY3VsYXRlZChzY29yZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIHRoaXMub25OZXh0QnV0dG9uQ2xpY2tlZChQcm9maWxlUGFnZS5Db21wdXRhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2dvdXRCdXR0b25DbGlja2VkKCkge1xyXG4gICAgICAgIC8vIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgICAgYWxlcnQoJ2xvZ291dCBidXR0b24gcHJlc3NlZC4uLiEnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYWdlVGl0bGUocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdQcm9maWxlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnU2tpbGxzJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnRXhwZXJpZW5jZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0NvbXB1dGF0aW9uJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnTWFya2V0YWJpbGl0eSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmF2QnV0dG9uVGV4dChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID49IFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ0ZpbmlzaCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ05leHQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0UHJvZmlsZURhdGEocHJvZmlsZTogYW55KSB7XHJcbiAgICAgICAgLy8gYWxlcnQocHJvZmlsZS5maXJzdE5hbWUpO1xyXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcblxyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUuZmlyc3ROYW1lICsgXCIgXCIgKyBwcm9maWxlLmxhc3ROYW1lO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IHByb2ZpbGUubG9jYXRpb24ubmFtZTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsICdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJvZmlsZS5wb3NpdGlvbnMudmFsdWVzLmZvckVhY2goZXhwZXJpZW5jZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBhbnlJbmZvID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvLkNvbXBhbnlOYW1lID0gZXhwZXJpZW5jZS5jb21wYW55Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvLlRpdGxlID0gZXhwZXJpZW5jZS50aXRsZTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8uU3RhcnREYXRlID0gZXhwZXJpZW5jZS5zdGFydERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2Uuc3RhcnREYXRlLnllYXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWV4cGVyaWVuY2UuaXNDdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gZXhwZXJpZW5jZS5lbmREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLmVuZERhdGUueWVhcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZURhdGEucGVyc29uUHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgIGxldCBwcm9maWxlSW5mbz1KU09OLnN0cmluZ2lmeSh0aGlzLnByb2ZpbGVEYXRhLnBlcnNvblByb2ZpbGUpO1xyXG4gICAgICAgIHNldFN0cmluZyhcInBlcnNvblByb2ZpbGVcIixwcm9maWxlSW5mbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvZmlsZUluZm8pO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb0N1cnJlbnRQYWdlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yICsgXCJleHRyYWN0UHJvZmlsZURhdGFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2ZpbGUoKSB7XHJcbiAgICAgICAgLy8gYWxlcnQoXCJnZXQgcHJvZmlsZSBjYWxsZWRcIik7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IGdldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnRva2VuID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vcmVyb3V0ZSB0byBsb2dpbiBwYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSh0aGlzLnRva2VuKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5leHRyYWN0UHJvZmlsZURhdGEoZGF0YSksXHJcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpLFxyXG4gICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZyhcIk5vZGUgQWRkZWQgQ29tcGxldGVcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVUb0N1cnJlbnRQYWdlKGN1cnJlbnRQYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBQcm9maWxlUGFnZS5Qcm9maWxlOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tbmF2aWdhdGVUb0N1cnJlbnRQYWdlLS0tLS0tLS0tLS0tJylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMucHJvZmlsZURhdGEucGVyc29uUHJvZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYW5hZ2VyL2Jhc2ljcHJvZmlsZVwiXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb2ZpbGVQYWdlLlNraWxsOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NraWxsc1wiXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9maWxlUGFnZS5FeHBlcmllbmNlOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2V4cGVyaWVuY2VcIl0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb246XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY2FsY3VsYXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eTpcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zY29yZVwiLCB0aGlzLnNjb3JlXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==