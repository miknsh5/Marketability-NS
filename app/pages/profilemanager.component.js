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
        this.token = application_settings_1.getString("accesstoken");
        if (this.token === null) {
            //reroute to login page
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBS2xELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFFakIseUNBR3lCO0FBVXpCLElBQWEsdUJBQXVCO0lBbUJoQyxpQ0FBcUIsb0JBQTBDLEVBQVMsY0FBOEI7UUFBakYseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVJ0RyxxQkFBZ0IsR0FBdUIsQ0FBQyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLEtBQUs7WUFDOUUsbUJBQVcsQ0FBQyxVQUFVLEVBQUUsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxrQkFBYSxHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUMzRSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTWhELElBQUksQ0FBQyxLQUFLLEdBQUUsZ0NBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFJLElBQUksQ0FBQyxDQUN0QixDQUFDO1lBQ0csdUJBQXVCO1FBQzNCLENBQUM7UUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3hDLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU5QixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixJ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LENBQ2hELFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUE3QixDQUE2QixFQUM3QixVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLEVBQ2hDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUcvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3REo7UUFFSyx3QkFBd0I7UUFDMUI7Ozs7Ozs7Ozs7OzBFQVdrRTtJQUNwRSxDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBN05ELElBNk5DO0FBN05ZLHVCQUF1QjtJQVBuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLDRCQUFvQixFQUFDLHNCQUFjLENBQUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUM7S0FFN0UsQ0FBQztxQ0FvQjZDLDRCQUFvQixFQUF5QixzQkFBYztHQW5CN0YsdUJBQXVCLENBNk5uQztBQTdOWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGRvY2tNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRCb29sZWFuLFxyXG4gICAgc2V0Qm9vbGVhbixcclxuICAgIGdldE51bWJlcixcclxuICAgIHNldE51bWJlcixcclxuICAgIGdldFN0cmluZyxcclxuICAgIHNldFN0cmluZyxcclxuICAgIGhhc0tleSxcclxuICAgIHJlbW92ZSxcclxuICAgIGNsZWFyXHJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGgvYXV0aC5jb25maWcnO1xyXG5pbXBvcnQge1xyXG4gICAgUGVyc29uUHJvZmlsZSwgU2tpbGwsIFByb2ZpbGUsXHJcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLFByb2ZpbGVTZXJ2aWNlLFxyXG59IGZyb20gJy4uL3NoYXJlZC9pbmRleCc7XHJcblxyXG5kZWNsYXJlIHZhciBBdXRoMExvY2s6IGFueTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1wcm9maWxlbWFuYWdlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOiBbTWFya2V0YWJpbGl0eVNlcnZpY2UsUHJvZmlsZVNlcnZpY2VdLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9wcm9maWxlbWFuYWdlci1jb21tb24uY3NzXCIsIFwicGFnZXMvcHJvZmlsZW1hbmFnZXIuY3NzXCJdXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGN1cnJlbnRQYWdlOiBQcm9maWxlUGFnZTtcclxuICAgIGN1cnJlbnRQcm9maWxlOiBQZXJzb25Qcm9maWxlO1xyXG4gICAgc2NvcmU6IHN0cmluZztcclxuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xyXG4gICAgbmF2QnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gICAgbG9jazogYW55O1xyXG4gICAgZWxlbWVudFByb2dyZXNzQmFyOiBhbnk7XHJcbiAgICBjdXJyZW50UHJvZ3Jlc3M6IG51bWJlcjtcclxuXHJcbiAgICBmb3J3YXJkTmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXHJcbiAgICBQcm9maWxlUGFnZS5FeHBlcmllbmNlLCBQcm9maWxlUGFnZS5Db21wdXRhdGlvbiwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgcHJldk5hdmlnYXRvbjogQXJyYXk8UHJvZmlsZVBhZ2U+ID0gW1Byb2ZpbGVQYWdlLlByb2ZpbGUsIFByb2ZpbGVQYWdlLlNraWxsLFxyXG4gICAgUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgdG9rZW46YW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIG1hcmtldGFiaWxpdHlTZXJ2aWNlOiBNYXJrZXRhYmlsaXR5U2VydmljZSxwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSkge1xyXG4gICAgICBcclxuICAgICAgIHRoaXMudG9rZW49IGdldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIpO1xyXG4gICAgICAgaWYodGhpcy50b2tlbiA9PT1udWxsKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgIC8vcmVyb3V0ZSB0byBsb2dpbiBwYWdlXHJcbiAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFByb2ZpbGVQYWdlLlByb2ZpbGU7XHJcbiAgICAgICAvLyB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKEFVVEhfQ09ORklHLmNsaWVudElELCBBVVRIX0NPTkZJRy5kb21haW4pO1xyXG4gICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvblswXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IDI1O1xyXG4gICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHRCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvbltjdXJyZW50SW5kZXggKyAxXTtcclxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZSh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xyXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblByZXZCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMucHJldk5hdmlnYXRvbi5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnByZXZOYXZpZ2F0b25bY3VycmVudEluZGV4IC0gMV07XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlID09PSBQcm9maWxlUGFnZS5NYXJrZXRhYmlsaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gNzU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyAtIDI1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWFya2V0YWJpbGl0eUNhbGN1bGF0ZWQoc2NvcmU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB0aGlzLm9uTmV4dEJ1dHRvbkNsaWNrZWQoUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9nb3V0QnV0dG9uQ2xpY2tlZCgpIHtcclxuICAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgIGFsZXJ0KCdsb2dvdXQgYnV0dG9uIHByZXNzZWQuLi4hJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFnZVRpdGxlKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnUHJvZmlsZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1NraWxscyc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0V4cGVyaWVuY2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdDb21wdXRhdGlvbic7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ01hcmtldGFiaWxpdHknO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldE5hdkJ1dHRvblRleHQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA+PSBQcm9maWxlUGFnZS5FeHBlcmllbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdGaW5pc2gnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdOZXh0JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXh0cmFjdFByb2ZpbGVEYXRhKHByb2ZpbGU6YW55KVxyXG4gICAge1xyXG4gICAgICAgIC8vIGFsZXJ0KHByb2ZpbGUuZmlyc3ROYW1lKTtcclxuICAgICAgICBsZXQgdXNlclByb2ZpbGUgPSBuZXcgUGVyc29uUHJvZmlsZSgpO1xyXG4gICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IG5ldyBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUuZmlyc3ROYW1lK1wiIFwiK3Byb2ZpbGUubGFzdE5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IHByb2ZpbGUubG9jYXRpb24ubmFtZTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gcHJvZmlsZS5oZWFkbGluZTtcclxuICAgICAgICAgICAgWydDIycsICdKYXZhJywgJ0phdmFTY3JpcHQnLCAnUHl0aG9uJywnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvZmlsZS5wb3NpdGlvbnMudmFsdWVzLmZvckVhY2goZXhwZXJpZW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uQ29tcGFueU5hbWUgPSBleHBlcmllbmNlLmNvbXBhbnkubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlRpdGxlID0gZXhwZXJpZW5jZS50aXRsZTtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZXhwZXJpZW5jZS5pc0N1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gZXhwZXJpZW5jZS5lbmREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLmVuZERhdGUueWVhcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgLy8gdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAvLyAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgLy8gdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGU9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KHRoaXMuY3VycmVudFByb2ZpbGUuUHJvZmlsZS5OYW1lKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUVycm9yKGVycm9yOmFueSlcclxuICAgIHtcclxuICAgIGFsZXJ0KGVycm9yK1wiZXh0cmFjdFByb2ZpbGVEYXRhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9maWxlKCkge1xyXG4gICAgICAgIC8vIGFsZXJ0KFwiZ2V0IHByb2ZpbGUgY2FsbGVkXCIpO1xyXG50aGlzLnByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUodGhpcy50b2tlbikuc3Vic2NyaWJlKFxyXG4gICAgZGF0YSA9PiB0aGlzLmV4dHJhY3RQcm9maWxlRGF0YShkYXRhKSxcclxuICAgICAgICAgICAgZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvciksXHJcbiAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKFwiTm9kZSBBZGRlZCBDb21wbGV0ZVwiKSk7XHJcbiAgXHJcblxyXG4gICAgICAgLyogY29uc3QgdXNlclByb2ZpbGUgPSBuZXcgUGVyc29uUHJvZmlsZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IFwiQW5zaHVsZWVcIjtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBcIk11bWJhaVwiO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IFwiRm91bmRlciwgQ2VubmVzdCBUZWNobm9sb2dpZXNcIjtcclxuICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCAnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgIC8vIEZldGNoIHByb2ZpbGUgaW5mb3JtYXRpb25cclxuICAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgIC8vY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgdGhpcy5sb2NrLmdldFVzZXJJbmZvKGFjY2Vzc1Rva2VuLCAoZXJyb3IsIHByb2ZpbGUpID0+IHtcclxuICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxyXG4gICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICB9XHJcbiBcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG4gXHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk5hbWUgPSBwcm9maWxlLm5hbWU7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgICAgICAgWydDIycsICdKYXZhJywgJ0phdmFTY3JpcHQnLCAnUHl0aG9uJywnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgICAgICAgcHJvZmlsZS5wb3NpdGlvbnMudmFsdWVzLmZvckVhY2goZXhwZXJpZW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgY29tcGFueUluZm8gPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlRpdGxlID0gZXhwZXJpZW5jZS50aXRsZTtcclxuICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5TdGFydERhdGUgPSBleHBlcmllbmNlLnN0YXJ0RGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5zdGFydERhdGUueWVhcjtcclxuIFxyXG4gICAgICAgICAgICAgICAgIGlmICghZXhwZXJpZW5jZS5pc0N1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XHJcbiAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gXHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUgPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICAgfSk7XHJcbiAqL1xyXG5cclxuICAgICAgICAvLyBkdW1teSBleHBlcmllbmNlIGRhdGFcclxuICAgICAgLyogIGxldCBkdW1teVdvcmtFeHBzID0gQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcblxyXG4gICAgICAgIFtcIkhERkNcIiwgXCJMJlRcIiwgXCJPbW5pVGVjaFwiLCBcIkNlbm5lc3RcIl0uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29tcGFueUluZm8xID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvMS5Db21wYW55TmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlRpdGxlID0gXCJYWVpcIjtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlN0YXJ0RGF0ZSA9IFwiMDEvMDIvMjAxMVwiO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mbzEuRW5kRGF0ZSA9IFwiMzAvMDcvMjAxM1wiO1xyXG4gICAgICAgICAgICBkdW1teVdvcmtFeHBzLnB1c2goY29tcGFueUluZm8xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gZHVtbXlXb3JrRXhwczsqL1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=