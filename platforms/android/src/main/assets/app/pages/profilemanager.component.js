"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var application_settings_1 = require("application-settings");
require("rxjs/Rx");
var index_1 = require("../shared/index");
var ProfileManagerComponent = (function () {
    function ProfileManagerComponent(marketabilityService, profileService, router, profileData) {
        this.marketabilityService = marketabilityService;
        this.profileService = profileService;
        this.router = router;
        this.profileData = profileData;
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
        alert(profile.firstName);
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
        alert("navigate to current page called" + currentPage);
        switch (currentPage) {
            case index_1.ProfilePage.Profile:
                console.log('-----------navigateToCurrentPage------------');
                console.dir(this.profileData.personProfile);
                //this.zone.run(() => {
                this.router.navigate(['home/basicprofile']);
                //});
                break;
            case index_1.ProfilePage.Skill:
                this.router.navigate(["home/skills"]);
                break;
            case index_1.ProfilePage.Experience:
                this.router.navigate(["home/experience"]);
                break;
            case index_1.ProfilePage.Computation:
                this.router.navigate(["home/calculation"]);
                break;
            case index_1.ProfilePage.Marketability:
                this.router.navigate(["home/score", this.score]);
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
        router_1.Router, index_1.ProfileData])
], ProfileManagerComponent);
exports.ProfileManagerComponent = ProfileManagerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBRzFELDBDQUEyRDtBQUUzRCw2REFVOEI7QUFFOUIsbUJBQWlCO0FBRWpCLHlDQUd5QjtBQVN6QixJQUFhLHVCQUF1QjtJQWtCaEMsaUNBQW9CLG9CQUEwQyxFQUFVLGNBQThCLEVBQzFGLE1BQWMsRUFBVSxXQUF3QjtRQUR4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzFGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVQ1RCxxQkFBZ0IsR0FBdUIsQ0FBQyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLEtBQUs7WUFDOUUsbUJBQVcsQ0FBQyxVQUFVLEVBQUUsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxrQkFBYSxHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUMzRSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTS9DLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVcsQ0FBQyxPQUFPLENBQUM7UUFDdkMsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BD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UUFDeEMsU0FBUyxFQUFFLENBQUMsNEJBQW9CLEVBQUUsc0JBQWMsQ0FBQztRQUNqRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSwwQkFBMEIsQ0FBQztLQUM3RSxDQUFDO3FDQW1CNEMsNEJBQW9CLEVBQTBCLHNCQUFjO1FBQ2xGLGVBQU0sRUFBdUIsbUJBQVc7R0FuQm5ELHVCQUF1QixDQWdMbkM7QUFoTFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGRvY2tNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtcclxuICAgIGdldEJvb2xlYW4sXHJcbiAgICBzZXRCb29sZWFuLFxyXG4gICAgZ2V0TnVtYmVyLFxyXG4gICAgc2V0TnVtYmVyLFxyXG4gICAgZ2V0U3RyaW5nLFxyXG4gICAgc2V0U3RyaW5nLFxyXG4gICAgaGFzS2V5LFxyXG4gICAgcmVtb3ZlLFxyXG4gICAgY2xlYXJcclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgQVVUSF9DT05GSUcgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC9hdXRoLmNvbmZpZyc7XHJcbmltcG9ydCB7XHJcbiAgICBQZXJzb25Qcm9maWxlLCBTa2lsbCwgUHJvZmlsZSwgUHJvZmlsZURhdGEsXHJcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZSxcclxufSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgQXV0aDBMb2NrOiBhbnk7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItcHJvZmlsZW1hbmFnZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9wcm9maWxlbWFuYWdlci5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW01hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZV0sXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9wcm9maWxlbWFuYWdlci5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNYW5hZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBjdXJyZW50UGFnZTogUHJvZmlsZVBhZ2U7XHJcbiAgICBzY29yZTogc3RyaW5nO1xyXG4gICAgcGFnZVRpdGxlOiBzdHJpbmc7XHJcbiAgICBuYXZCdXR0b25UZXh0OiBzdHJpbmc7XHJcbiAgICBsb2NrOiBhbnk7XHJcbiAgICBlbGVtZW50UHJvZ3Jlc3NCYXI6IGFueTtcclxuICAgIGN1cnJlbnRQcm9ncmVzczogbnVtYmVyO1xyXG5cclxuICAgIGZvcndhcmROYXZpZ2F0b246IEFycmF5PFByb2ZpbGVQYWdlPiA9IFtQcm9maWxlUGFnZS5Qcm9maWxlLCBQcm9maWxlUGFnZS5Ta2lsbCxcclxuICAgIFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UsIFByb2ZpbGVQYWdlLkNvbXB1dGF0aW9uLCBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5XTtcclxuXHJcbiAgICBwcmV2TmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXHJcbiAgICBQcm9maWxlUGFnZS5FeHBlcmllbmNlLCBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5XTtcclxuXHJcbiAgICB0b2tlbjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2V0YWJpbGl0eVNlcnZpY2U6IE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHByb2ZpbGVEYXRhOiBQcm9maWxlRGF0YSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBQcm9maWxlUGFnZS5Qcm9maWxlO1xyXG4gICAgICAgIC8vIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soQVVUSF9DT05GSUcuY2xpZW50SUQsIEFVVEhfQ09ORklHLmRvbWFpbik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvblswXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IDI1O1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHRCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvbltjdXJyZW50SW5kZXggKyAxXTtcclxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZSh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb0N1cnJlbnRQYWdlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG5cclxuICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NQZXJjZW50Jykuc3R5bGUud2lkdGggPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArICclJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25QcmV2QnV0dG9uQ2xpY2tlZChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLnByZXZOYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2TmF2aWdhdG9uW2N1cnJlbnRJbmRleCAtIDFdO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG5cclxuICAgICAgICBpZiAocGFnZSA9PT0gUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IDc1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgLSAyNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb0N1cnJlbnRQYWdlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2V0YWJpbGl0eUNhbGN1bGF0ZWQoc2NvcmU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB0aGlzLm9uTmV4dEJ1dHRvbkNsaWNrZWQoUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9nb3V0QnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgIGFsZXJ0KCdsb2dvdXQgYnV0dG9uIHByZXNzZWQuLi4hJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFnZVRpdGxlKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnUHJvZmlsZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1NraWxscyc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0V4cGVyaWVuY2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdDb21wdXRhdGlvbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ01hcmtldGFiaWxpdHknO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE5hdkJ1dHRvblRleHQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA+PSBQcm9maWxlUGFnZS5FeHBlcmllbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdGaW5pc2gnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdOZXh0JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0cmFjdFByb2ZpbGVEYXRhKHByb2ZpbGU6IGFueSkge1xyXG4gICAgICAgICBhbGVydChwcm9maWxlLmZpcnN0TmFtZSk7XHJcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IG5ldyBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuXHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gcHJvZmlsZS5maXJzdE5hbWUgKyBcIiBcIiArIHByb2ZpbGUubGFzdE5hbWU7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gcHJvZmlsZS5sb2NhdGlvbi5uYW1lO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XHJcbiAgICAgICAgWydDIycsICdKYXZhJywgJ0phdmFTY3JpcHQnLCAnUHl0aG9uJywgJ1J1YnkgT24gUmFpbHMnXS5mb3JFYWNoKGVsbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFueUluZm8gPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8uQ29tcGFueU5hbWUgPSBleHBlcmllbmNlLmNvbXBhbnkubmFtZTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mby5TdGFydERhdGUgPSBleHBlcmllbmNlLnN0YXJ0RGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5zdGFydERhdGUueWVhcjtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXhwZXJpZW5jZS5pc0N1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSBleHBlcmllbmNlLmVuZERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2UuZW5kRGF0ZS55ZWFyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlRGF0YS5wZXJzb25Qcm9maWxlID0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgbGV0IHByb2ZpbGVJbmZvPUpTT04uc3RyaW5naWZ5KHRoaXMucHJvZmlsZURhdGEucGVyc29uUHJvZmlsZSk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwicGVyc29uUHJvZmlsZVwiLHByb2ZpbGVJbmZvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9maWxlSW5mbyk7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvQ3VycmVudFBhZ2UodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XHJcbiAgICAgICAgYWxlcnQoZXJyb3IgKyBcImV4dHJhY3RQcm9maWxlRGF0YVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvZmlsZSgpIHtcclxuICAgICAgICAvLyBhbGVydChcImdldCBwcm9maWxlIGNhbGxlZFwiKTtcclxuICAgICAgICB0aGlzLnRva2VuID0gZ2V0U3RyaW5nKFwiYWNjZXNzdG9rZW5cIik7XHJcbiAgICAgICAgaWYgKHRoaXMudG9rZW4gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy9yZXJvdXRlIHRvIGxvZ2luIHBhZ2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9maWxlU2VydmljZS5nZXRQcm9maWxlKHRoaXMudG9rZW4pLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB0aGlzLmV4dHJhY3RQcm9maWxlRGF0YShkYXRhKSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvciksXHJcbiAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKFwiTm9kZSBBZGRlZCBDb21wbGV0ZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZVRvQ3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgYWxlcnQoXCJuYXZpZ2F0ZSB0byBjdXJyZW50IHBhZ2UgY2FsbGVkXCIrY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBQcm9maWxlUGFnZS5Qcm9maWxlOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tbmF2aWdhdGVUb0N1cnJlbnRQYWdlLS0tLS0tLS0tLS0tJylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMucHJvZmlsZURhdGEucGVyc29uUHJvZmlsZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnaG9tZS9iYXNpY3Byb2ZpbGUnXSk7XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZmlsZVBhZ2UuU2tpbGw6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJob21lL3NraWxsc1wiXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9maWxlUGFnZS5FeHBlcmllbmNlOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZS9leHBlcmllbmNlXCJdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb2ZpbGVQYWdlLkNvbXB1dGF0aW9uOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZS9jYWxjdWxhdGlvblwiXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZS9zY29yZVwiLCB0aGlzLnNjb3JlXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==