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
            userProfile.Experience.WorkExperience.push(companyInfo);
            userProfile.Experience.WorkExperience.push(companyInfo);
            userProfile.Experience.WorkExperience.push(companyInfo);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBS2xELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFFakIseUNBR3lCO0FBVXpCLElBQWEsdUJBQXVCO0lBbUJoQyxpQ0FBb0Isb0JBQTBDLEVBQVUsY0FBOEI7UUFBbEYseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVJ0RyxxQkFBZ0IsR0FBdUIsQ0FBQyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLEtBQUs7WUFDOUUsbUJBQVcsQ0FBQyxVQUFVLEVBQUUsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxrQkFBYSxHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUMzRSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVcsQ0FBQyxPQUFPLENBQUM7UUFDdkMsdUVBQXVFO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHFEQUFtQixHQUFuQixVQUFvQixJQUFp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LEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0Qix1QkFBdUI7UUFDM0IsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQ2hELFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUE3QixDQUE2QixFQUNyQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLEVBQ2hDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUc5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3REo7UUFFSSx3QkFBd0I7UUFDeEI7Ozs7Ozs7Ozs7OzBFQVdrRTtJQUN0RSxDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBM05ELElBMk5DO0FBM05ZLHVCQUF1QjtJQVBuQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBRSxDQUFDLDRCQUFvQixFQUFFLHNCQUFjLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUM7S0FFN0UsQ0FBQztxQ0FvQjRDLDRCQUFvQixFQUEwQixzQkFBYztHQW5CN0YsdUJBQXVCLENBMk5uQztBQTNOWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBkb2NrTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIjtcblxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHtcbiAgICBnZXRCb29sZWFuLFxuICAgIHNldEJvb2xlYW4sXG4gICAgZ2V0TnVtYmVyLFxuICAgIHNldE51bWJlcixcbiAgICBnZXRTdHJpbmcsXG4gICAgc2V0U3RyaW5nLFxuICAgIGhhc0tleSxcbiAgICByZW1vdmUsXG4gICAgY2xlYXJcbn0gZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmltcG9ydCBcInJ4anMvUnhcIjtcbmltcG9ydCB7IEFVVEhfQ09ORklHIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGgvYXV0aC5jb25maWcnO1xuaW1wb3J0IHtcbiAgICBQZXJzb25Qcm9maWxlLCBTa2lsbCwgUHJvZmlsZSxcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZSxcbn0gZnJvbSAnLi4vc2hhcmVkL2luZGV4JztcblxuZGVjbGFyZSB2YXIgQXV0aDBMb2NrOiBhbnk7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21rYi1wcm9maWxlbWFuYWdlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9wcm9maWxlbWFuYWdlci5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtNYXJrZXRhYmlsaXR5U2VydmljZSwgUHJvZmlsZVNlcnZpY2VdLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvcHJvZmlsZW1hbmFnZXItY29tbW9uLmNzc1wiLCBcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmNzc1wiXVxuXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNYW5hZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGN1cnJlbnRQYWdlOiBQcm9maWxlUGFnZTtcbiAgICBjdXJyZW50UHJvZmlsZTogUGVyc29uUHJvZmlsZTtcbiAgICBzY29yZTogc3RyaW5nO1xuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xuICAgIG5hdkJ1dHRvblRleHQ6IHN0cmluZztcbiAgICBsb2NrOiBhbnk7XG4gICAgZWxlbWVudFByb2dyZXNzQmFyOiBhbnk7XG4gICAgY3VycmVudFByb2dyZXNzOiBudW1iZXI7XG5cbiAgICBmb3J3YXJkTmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXG4gICAgUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSwgUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24sIFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHldO1xuXG4gICAgcHJldk5hdmlnYXRvbjogQXJyYXk8UHJvZmlsZVBhZ2U+ID0gW1Byb2ZpbGVQYWdlLlByb2ZpbGUsIFByb2ZpbGVQYWdlLlNraWxsLFxuICAgIFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UsIFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHldO1xuXG4gICAgdG9rZW46IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2V0YWJpbGl0eVNlcnZpY2U6IE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSkge1xuXG5cbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFByb2ZpbGVQYWdlLlByb2ZpbGU7XG4gICAgICAgIC8vIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soQVVUSF9DT05GSUcuY2xpZW50SUQsIEFVVEhfQ09ORklHLmRvbWFpbik7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmZvcndhcmROYXZpZ2F0b25bMF07XG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRQcm9maWxlKCk7XG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XG4gICAgfVxuXG4gICAgb25OZXh0QnV0dG9uQ2xpY2tlZChwYWdlOiBQcm9maWxlUGFnZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmZvcndhcmROYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvbltjdXJyZW50SW5kZXggKyAxXTtcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xuICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NQZXJjZW50Jykuc3R5bGUud2lkdGggPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArICclJztcblxuICAgIH1cblxuICAgIG9uUHJldkJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcblxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLnByZXZOYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucHJldk5hdmlnYXRvbltjdXJyZW50SW5kZXggLSAxXTtcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XG5cbiAgICAgICAgaWYgKHBhZ2UgPT09IFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gNzU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IHRoaXMuY3VycmVudFByb2dyZXNzIC0gMjU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XG4gICAgfVxuXG4gICAgb25NYXJrZXRhYmlsaXR5Q2FsY3VsYXRlZChzY29yZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcbiAgICAgICAgdGhpcy5vbk5leHRCdXR0b25DbGlja2VkKFByb2ZpbGVQYWdlLkNvbXB1dGF0aW9uKTtcbiAgICB9XG5cbiAgICBvbkxvZ291dEJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIC8vIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgIGFsZXJ0KCdsb2dvdXQgYnV0dG9uIHByZXNzZWQuLi4hJyk7XG4gICAgfVxuXG4gICAgc2V0UGFnZVRpdGxlKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XG4gICAgICAgIGlmIChwYWdlID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdQcm9maWxlJztcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdTa2lsbHMnO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0V4cGVyaWVuY2UnO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDMpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0NvbXB1dGF0aW9uJztcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSA0KSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdNYXJrZXRhYmlsaXR5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROYXZCdXR0b25UZXh0KHBhZ2U6IFByb2ZpbGVQYWdlKSB7XG4gICAgICAgIGlmIChwYWdlID49IFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMubmF2QnV0dG9uVGV4dCA9ICdGaW5pc2gnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ05leHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXh0cmFjdFByb2ZpbGVEYXRhKHByb2ZpbGU6IGFueSkge1xuICAgICAgICAvLyBhbGVydChwcm9maWxlLmZpcnN0TmFtZSk7XG4gICAgICAgIGxldCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xuICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xuICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xuXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUuZmlyc3ROYW1lICsgXCIgXCIgKyBwcm9maWxlLmxhc3ROYW1lO1xuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XG4gICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsICdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcbiAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvZmlsZS5wb3NpdGlvbnMudmFsdWVzLmZvckVhY2goZXhwZXJpZW5jZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xuICAgICAgICAgICAgY29tcGFueUluZm8uQ29tcGFueU5hbWUgPSBleHBlcmllbmNlLmNvbXBhbnkubmFtZTtcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvLlRpdGxlID0gZXhwZXJpZW5jZS50aXRsZTtcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xuXG4gICAgICAgICAgICBpZiAoIWV4cGVyaWVuY2UuaXNDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XG4gICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xuICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XG4gICAgICAgIC8vIGFsZXJ0KHRoaXMuY3VycmVudFByb2ZpbGUuUHJvZmlsZS5OYW1lKTtcbiAgICB9XG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICBhbGVydChlcnJvciArIFwiZXh0cmFjdFByb2ZpbGVEYXRhXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQcm9maWxlKCkge1xuICAgICAgICAvLyBhbGVydChcImdldCBwcm9maWxlIGNhbGxlZFwiKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IGdldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIpO1xuICAgICAgICBpZiAodGhpcy50b2tlbiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy9yZXJvdXRlIHRvIGxvZ2luIHBhZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUodGhpcy50b2tlbikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiB0aGlzLmV4dHJhY3RQcm9maWxlRGF0YShkYXRhKSxcbiAgICAgICAgICAgIGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJOb2RlIEFkZGVkIENvbXBsZXRlXCIpKTtcblxuXG4gICAgICAgIC8qIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcbiAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xuICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xuICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XG4gICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gXCJBbnNodWxlZVwiO1xuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gXCJNdW1iYWlcIjtcbiAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IFwiRm91bmRlciwgQ2VubmVzdCBUZWNobm9sb2dpZXNcIjtcbiAgICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsICdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xuICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XG4gICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xuICAgICAgICAgLy8gRmV0Y2ggcHJvZmlsZSBpbmZvcm1hdGlvblxuICAgICAgICAgLyogY29uc3QgdXNlclByb2ZpbGUgPSBuZXcgUGVyc29uUHJvZmlsZSgpO1xuICAgICAgICAgIC8vY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKTtcbiAgICAgICAgICB0aGlzLmxvY2suZ2V0VXNlckluZm8oYWNjZXNzVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcbiAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XG4gIFxuICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk5hbWUgPSBwcm9maWxlLm5hbWU7XG4gICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IHByb2ZpbGUubG9jYXRpb24ubmFtZTtcbiAgICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gcHJvZmlsZS5oZWFkbGluZTtcbiAgICAgICAgICAgICAgWydDIycsICdKYXZhJywgJ0phdmFTY3JpcHQnLCAnUHl0aG9uJywnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XG4gICAgICAgICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XG4gICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XG4gICAgICAgICAgICAgIH0pO1xuICBcbiAgICAgICAgICAgICAgcHJvZmlsZS5wb3NpdGlvbnMudmFsdWVzLmZvckVhY2goZXhwZXJpZW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xuICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uQ29tcGFueU5hbWUgPSBleHBlcmllbmNlLmNvbXBhbnkubmFtZTtcbiAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlRpdGxlID0gZXhwZXJpZW5jZS50aXRsZTtcbiAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xuICBcbiAgICAgICAgICAgICAgICAgIGlmICghZXhwZXJpZW5jZS5pc0N1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gZXhwZXJpZW5jZS5lbmREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLmVuZERhdGUueWVhcjtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcbiAgICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XG4gICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xuICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcbiAgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XG4gICAgICAgICAgfSk7XG4gICovXG5cbiAgICAgICAgLy8gZHVtbXkgZXhwZXJpZW5jZSBkYXRhXG4gICAgICAgIC8qICBsZXQgZHVtbXlXb3JrRXhwcyA9IEFycmF5PENvbXBhbnlJbmZvPigpO1xuICBcbiAgICAgICAgICBbXCJIREZDXCIsIFwiTCZUXCIsIFwiT21uaVRlY2hcIiwgXCJDZW5uZXN0XCJdLmZvckVhY2goZWxtID0+IHtcbiAgICAgICAgICAgICAgbGV0IGNvbXBhbnlJbmZvMSA9IG5ldyBDb21wYW55SW5mbygpO1xuICAgICAgICAgICAgICBjb21wYW55SW5mbzEuQ29tcGFueU5hbWUgPSBlbG07XG4gICAgICAgICAgICAgIGNvbXBhbnlJbmZvMS5UaXRsZSA9IFwiWFlaXCI7XG4gICAgICAgICAgICAgIGNvbXBhbnlJbmZvMS5TdGFydERhdGUgPSBcIjAxLzAyLzIwMTFcIjtcbiAgICAgICAgICAgICAgY29tcGFueUluZm8xLkVuZERhdGUgPSBcIjMwLzA3LzIwMTNcIjtcbiAgICAgICAgICAgICAgZHVtbXlXb3JrRXhwcy5wdXNoKGNvbXBhbnlJbmZvMSk7XG4gICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IGR1bW15V29ya0V4cHM7Ki9cbiAgICB9XG5cbn1cbiJdfQ==