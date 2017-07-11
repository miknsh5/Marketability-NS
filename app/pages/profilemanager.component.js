"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("application-settings");
require("rxjs/Rx");
var index_1 = require("../shared/index");
var ProfileManagerComponent = (function () {
    function ProfileManagerComponent(marketabilityService, profileService) {
        this.marketabilityService = marketabilityService;
        this.profileService = profileService;
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
            // userProfile.Experience.WorkExperience.push(companyInfo);
            //  userProfile.Experience.WorkExperience.push(companyInfo);
            // userProfile.Experience.WorkExperience.push(companyInfo);
        });
        this.currentProfile = userProfile;
        // alert(this.currentProfile.Profile.Name);
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
        /* const userProfile = new PersonProfile();
         userProfile.Profile = new Profile();
         userProfile.Skills = new Array<Skill>();
         userProfile.Experience = new Experience();
         userProfile.Experience.WorkExperience = new Array<CompanyInfo>();
         userProfile.Profile.Name = "Anshulee";
         userProfile.Profile.City = "Mumbai";
         userProfile.Profile.Occupation = "Founder, Cennest Technologies";
         ['C#', 'Java', 'JavaScript', 'Python', 'Ruby On Rails'].forEach(elm => {
             const skill = new Skill();
             skill.SkillName = elm;
             userProfile.Skills.push(skill);
         });
         this.currentProfile = userProfile;
         // Fetch profile information
         /* const userProfile = new PersonProfile();
          //const accessToken = localStorage.getItem('accessToken');
          this.lock.getUserInfo(accessToken, (error, profile) => {
              if (error) {
                  // Handle error
                  throw new Error(error);
              }
  
              userProfile.Profile = new Profile();
              userProfile.Skills = new Array<Skill>();
              userProfile.Experience = new Experience();
              userProfile.Experience.WorkExperience = new Array<CompanyInfo>();
  
              userProfile.Profile.Name = profile.name;
              userProfile.Profile.City = profile.location.name;
              userProfile.Profile.Occupation = profile.headline;
              ['C#', 'Java', 'JavaScript', 'Python','Ruby On Rails'].forEach(elm => {
                  const skill = new Skill();
                  skill.SkillName = elm;
                  userProfile.Skills.push(skill);
              });
  
              profile.positions.values.forEach(experience => {
                  const companyInfo = new CompanyInfo();
                  companyInfo.CompanyName = experience.company.name;
                  companyInfo.Title = experience.title;
                  companyInfo.StartDate = experience.startDate.month + ' / ' + experience.startDate.year;
  
                  if (!experience.isCurrent) {
                      companyInfo.EndDate = experience.endDate.month + ' / ' + experience.endDate.year;
                  } else {
                      companyInfo.EndDate = '';
                  }
                  userProfile.Experience.WorkExperience.push(companyInfo);
                  userProfile.Experience.WorkExperience.push(companyInfo);
                  userProfile.Experience.WorkExperience.push(companyInfo);
                  userProfile.Experience.WorkExperience.push(companyInfo);
  
              });
              this.currentProfile = userProfile;
          });
  */
        // dummy experience data
        /*  let dummyWorkExps = Array<CompanyInfo>();
  
          ["HDFC", "L&T", "OmniTech", "Cennest"].forEach(elm => {
              let companyInfo1 = new CompanyInfo();
              companyInfo1.CompanyName = elm;
              companyInfo1.Title = "XYZ";
              companyInfo1.StartDate = "01/02/2011";
              companyInfo1.EndDate = "30/07/2013";
              dummyWorkExps.push(companyInfo1);
          });
  
          this.currentProfile.Experience.WorkExperience = dummyWorkExps;*/
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
    __metadata("design:paramtypes", [index_1.MarketabilityService, index_1.ProfileService])
], ProfileManagerComponent);
exports.ProfileManagerComponent = ProfileManagerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBS2xELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFFakIseUNBR3lCO0FBVXpCLElBQWEsdUJBQXVCO0lBbUJoQyxpQ0FBb0Isb0JBQTBDLEVBQVUsY0FBOEI7UUFBbEYseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVJ0RyxxQkFBZ0IsR0FBdUIsQ0FBQyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLEtBQUs7WUFDOUUsbUJBQVcsQ0FBQyxVQUFVLEVBQUUsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxrQkFBYSxHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUMzRSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVcsQ0FBQyxPQUFPLENBQUM7UUFDdkMsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHFEQUFtQixHQUFuQixVQUFvQixJQUFp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LENBQ2hELFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUE3QixDQUE2QixFQUNyQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLEVBQ2hDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUc5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3REo7UUFFSSx3QkFBd0I7UUFDeEI7Ozs7Ozs7Ozs7OzBFQVdrRTtJQUN0RSxDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBM05ELElBMk5DO0FBM05ZLHVCQUF1QjtJQVBuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLDRCQUFvQixFQUFFLHNCQUFjLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUM7S0FFN0UsQ0FBQztxQ0FvQjRDLDRCQUFvQixFQUEwQixzQkFBYztHQW5CN0YsdUJBQXVCLENBMk5uQztBQTNOWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGRvY2tNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGgvYXV0aC5jb25maWcnO1xyXG5pbXBvcnQge1xyXG4gICAgUGVyc29uUHJvZmlsZSwgU2tpbGwsIFByb2ZpbGUsXHJcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZSxcclxufSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgQXV0aDBMb2NrOiBhbnk7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItcHJvZmlsZW1hbmFnZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9wcm9maWxlbWFuYWdlci5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW01hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZV0sXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9wcm9maWxlbWFuYWdlci5jc3NcIl1cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlTWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgY3VycmVudFBhZ2U6IFByb2ZpbGVQYWdlO1xyXG4gICAgY3VycmVudFByb2ZpbGU6IFBlcnNvblByb2ZpbGU7XHJcbiAgICBzY29yZTogc3RyaW5nO1xyXG4gICAgcGFnZVRpdGxlOiBzdHJpbmc7XHJcbiAgICBuYXZCdXR0b25UZXh0OiBzdHJpbmc7XHJcbiAgICBsb2NrOiBhbnk7XHJcbiAgICBlbGVtZW50UHJvZ3Jlc3NCYXI6IGFueTtcclxuICAgIGN1cnJlbnRQcm9ncmVzczogbnVtYmVyO1xyXG5cclxuICAgIGZvcndhcmROYXZpZ2F0b246IEFycmF5PFByb2ZpbGVQYWdlPiA9IFtQcm9maWxlUGFnZS5Qcm9maWxlLCBQcm9maWxlUGFnZS5Ta2lsbCxcclxuICAgIFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UsIFByb2ZpbGVQYWdlLkNvbXB1dGF0aW9uLCBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5XTtcclxuXHJcbiAgICBwcmV2TmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXHJcbiAgICBQcm9maWxlUGFnZS5FeHBlcmllbmNlLCBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5XTtcclxuXHJcbiAgICB0b2tlbjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2V0YWJpbGl0eVNlcnZpY2U6IE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSkge1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFByb2ZpbGVQYWdlLlByb2ZpbGU7XHJcbiAgICAgICAgLy8gdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIX0NPTkZJRy5jbGllbnRJRCwgQVVUSF9DT05GSUcuZG9tYWluKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uWzBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHRCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvbltjdXJyZW50SW5kZXggKyAxXTtcclxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZSh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblByZXZCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMucHJldk5hdmlnYXRvbi5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnByZXZOYXZpZ2F0b25bY3VycmVudEluZGV4IC0gMV07XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlID09PSBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gNzU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyAtIDI1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2V0YWJpbGl0eUNhbGN1bGF0ZWQoc2NvcmU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB0aGlzLm9uTmV4dEJ1dHRvbkNsaWNrZWQoUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9nb3V0QnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgIGFsZXJ0KCdsb2dvdXQgYnV0dG9uIHByZXNzZWQuLi4hJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFnZVRpdGxlKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnUHJvZmlsZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1NraWxscyc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0V4cGVyaWVuY2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdDb21wdXRhdGlvbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ01hcmtldGFiaWxpdHknO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE5hdkJ1dHRvblRleHQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA+PSBQcm9maWxlUGFnZS5FeHBlcmllbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdGaW5pc2gnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdOZXh0JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0cmFjdFByb2ZpbGVEYXRhKHByb2ZpbGU6IGFueSkge1xyXG4gICAgICAgIC8vIGFsZXJ0KHByb2ZpbGUuZmlyc3ROYW1lKTtcclxuICAgICAgICBsZXQgdXNlclByb2ZpbGUgPSBuZXcgUGVyc29uUHJvZmlsZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG5cclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk5hbWUgPSBwcm9maWxlLmZpcnN0TmFtZSArIFwiIFwiICsgcHJvZmlsZS5sYXN0TmFtZTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gcHJvZmlsZS5oZWFkbGluZTtcclxuICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCAnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2ZpbGUucG9zaXRpb25zLnZhbHVlcy5mb3JFYWNoKGV4cGVyaWVuY2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mby5UaXRsZSA9IGV4cGVyaWVuY2UudGl0bGU7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgLy8gdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgLy8gIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgIC8vIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgIC8vIGFsZXJ0KHRoaXMuY3VycmVudFByb2ZpbGUuUHJvZmlsZS5OYW1lKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgICAgICBhbGVydChlcnJvciArIFwiZXh0cmFjdFByb2ZpbGVEYXRhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9maWxlKCkge1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiZ2V0IHByb2ZpbGUgY2FsbGVkXCIpO1xyXG4gICAgICAgIHRoaXMudG9rZW4gPSBnZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiKTtcclxuICAgICAgICBpZiAodGhpcy50b2tlbiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvL3Jlcm91dGUgdG8gbG9naW4gcGFnZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUodGhpcy50b2tlbikuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHRoaXMuZXh0cmFjdFByb2ZpbGVEYXRhKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJOb2RlIEFkZGVkIENvbXBsZXRlXCIpKTtcclxuXHJcblxyXG4gICAgICAgIC8qIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IFwiQW5zaHVsZWVcIjtcclxuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gXCJNdW1iYWlcIjtcclxuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gXCJGb3VuZGVyLCBDZW5uZXN0IFRlY2hub2xvZ2llc1wiO1xyXG4gICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCAnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgIC8vIEZldGNoIHByb2ZpbGUgaW5mb3JtYXRpb25cclxuICAgICAgICAgLyogY29uc3QgdXNlclByb2ZpbGUgPSBuZXcgUGVyc29uUHJvZmlsZSgpO1xyXG4gICAgICAgICAgLy9jb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICAgdGhpcy5sb2NrLmdldFVzZXJJbmZvKGFjY2Vzc1Rva2VuLCAoZXJyb3IsIHByb2ZpbGUpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG4gIFxyXG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUubmFtZTtcclxuICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gcHJvZmlsZS5oZWFkbGluZTtcclxuICAgICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICBcclxuICAgICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgY29tcGFueUluZm8gPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uQ29tcGFueU5hbWUgPSBleHBlcmllbmNlLmNvbXBhbnkubmFtZTtcclxuICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5TdGFydERhdGUgPSBleHBlcmllbmNlLnN0YXJ0RGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5zdGFydERhdGUueWVhcjtcclxuICBcclxuICAgICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICBcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgICB9KTtcclxuICAqL1xyXG5cclxuICAgICAgICAvLyBkdW1teSBleHBlcmllbmNlIGRhdGFcclxuICAgICAgICAvKiAgbGV0IGR1bW15V29ya0V4cHMgPSBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuICBcclxuICAgICAgICAgIFtcIkhERkNcIiwgXCJMJlRcIiwgXCJPbW5pVGVjaFwiLCBcIkNlbm5lc3RcIl0uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBjb21wYW55SW5mbzEgPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgICBjb21wYW55SW5mbzEuQ29tcGFueU5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgICAgY29tcGFueUluZm8xLlRpdGxlID0gXCJYWVpcIjtcclxuICAgICAgICAgICAgICBjb21wYW55SW5mbzEuU3RhcnREYXRlID0gXCIwMS8wMi8yMDExXCI7XHJcbiAgICAgICAgICAgICAgY29tcGFueUluZm8xLkVuZERhdGUgPSBcIjMwLzA3LzIwMTNcIjtcclxuICAgICAgICAgICAgICBkdW1teVdvcmtFeHBzLnB1c2goY29tcGFueUluZm8xKTtcclxuICAgICAgICAgIH0pO1xyXG4gIFxyXG4gICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gZHVtbXlXb3JrRXhwczsqL1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=