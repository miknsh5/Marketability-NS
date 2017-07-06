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
        // alert(profile.id);
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
        var dummyWorkExps = Array();
        ["HDFC", "L&T", "OmniTech", "Cennest"].forEach(function (elm) {
            var companyInfo1 = new index_1.CompanyInfo();
            companyInfo1.CompanyName = elm;
            companyInfo1.Title = "XYZ";
            companyInfo1.StartDate = "01/02/2011";
            companyInfo1.EndDate = "30/07/2013";
            dummyWorkExps.push(companyInfo1);
        });
        this.currentProfile.Experience.WorkExperience = dummyWorkExps;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBS2xELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFFakIseUNBR3lCO0FBVXpCLElBQWEsdUJBQXVCO0lBbUJoQyxpQ0FBcUIsb0JBQTBDLEVBQVMsY0FBOEI7UUFBakYseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVJ0RyxxQkFBZ0IsR0FBdUIsQ0FBQyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLEtBQUs7WUFDOUUsbUJBQVcsQ0FBQyxVQUFVLEVBQUUsbUJBQVcsQ0FBQyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxrQkFBYSxHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUMzRSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTWhELElBQUksQ0FBQyxLQUFLLEdBQUUsZ0NBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFJLElBQUksQ0FBQyxDQUN0QixDQUFDO1lBQ0csdUJBQXVCO1FBQzNCLENBQUM7UUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3hDLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU5QixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsSUFBaUI7UUFDakMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ2pELHVGQUF1RjtJQUUzRixDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLElBQWlCO1FBRWpDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLG1CQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JELENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFBMEIsS0FBYTtRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsdURBQXFCLEdBQXJCO1FBQ0ksNkJBQTZCO1FBQzdCLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw4Q0FBWSxHQUFaLFVBQWEsSUFBaUI7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ3JDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDTCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLElBQWlCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFRCxvREFBa0IsR0FBbEIsVUFBbUIsT0FBVztRQUUzQixxQkFBcUI7UUFDcEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxxQkFBYSxFQUFFLENBQUM7UUFDckMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQU8sRUFBRSxDQUFDO1FBQ2pDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztRQUN4QyxXQUFXLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFlLENBQUM7UUFFakUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNsRSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNqRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2xELENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDOUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUN0QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFDdkMsSUFBTSxXQUFXLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7WUFDdEMsV0FBVyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsRCxXQUFXLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDckMsV0FBVyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFFdkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsV0FBVyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDckYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFdBQVcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQzdCLENBQUM7WUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxHQUFFLFdBQVcsQ0FBQztRQUNsQywyQ0FBMkM7SUFDbEQsQ0FBQztJQUNELDZDQUFXLEdBQVgsVUFBWSxLQUFTO1FBRXJCLEtBQUssQ0FBQyxLQUFLLEdBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sNENBQVUsR0FBakI7UUFBQSxpQkErRUM7UUE3RUwsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FDaEQsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQTdCLENBQTZCLEVBQzdCLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsRUFDaEMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1FBRy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdESjtRQUVLLHdCQUF3QjtRQUN4QixJQUFJLGFBQWEsR0FBRyxLQUFLLEVBQWUsQ0FBQztRQUV6QyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDOUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7WUFDckMsWUFBWSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDM0IsWUFBWSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7WUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFDcEMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDbEUsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQTdORCxJQTZOQztBQTdOWSx1QkFBdUI7SUFQbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxTQUFTLEVBQUUsQ0FBQyw0QkFBb0IsRUFBQyxzQkFBYyxDQUFDO1FBQ2hELFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLDBCQUEwQixDQUFDO0tBRTdFLENBQUM7cUNBb0I2Qyw0QkFBb0IsRUFBeUIsc0JBQWM7R0FuQjdGLHVCQUF1QixDQTZObkM7QUE3TlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBkb2NrTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZ2V0Qm9vbGVhbixcclxuICAgIHNldEJvb2xlYW4sXHJcbiAgICBnZXROdW1iZXIsXHJcbiAgICBzZXROdW1iZXIsXHJcbiAgICBnZXRTdHJpbmcsXHJcbiAgICBzZXRTdHJpbmcsXHJcbiAgICBoYXNLZXksXHJcbiAgICByZW1vdmUsXHJcbiAgICBjbGVhclxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBBVVRIX0NPTkZJRyB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoL2F1dGguY29uZmlnJztcclxuaW1wb3J0IHtcclxuICAgIFBlcnNvblByb2ZpbGUsIFNraWxsLCBQcm9maWxlLFxyXG4gICAgRXhwZXJpZW5jZSwgQ29tcGFueUluZm8sIFByb2ZpbGVQYWdlLCBNYXJrZXRhYmlsaXR5U2VydmljZSxQcm9maWxlU2VydmljZSxcclxufSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgQXV0aDBMb2NrOiBhbnk7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItcHJvZmlsZW1hbmFnZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9wcm9maWxlbWFuYWdlci5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW01hcmtldGFiaWxpdHlTZXJ2aWNlLFByb2ZpbGVTZXJ2aWNlXSxcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvcHJvZmlsZW1hbmFnZXItY29tbW9uLmNzc1wiLCBcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmNzc1wiXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNYW5hZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBjdXJyZW50UGFnZTogUHJvZmlsZVBhZ2U7XHJcbiAgICBjdXJyZW50UHJvZmlsZTogUGVyc29uUHJvZmlsZTtcclxuICAgIHNjb3JlOiBzdHJpbmc7XHJcbiAgICBwYWdlVGl0bGU6IHN0cmluZztcclxuICAgIG5hdkJ1dHRvblRleHQ6IHN0cmluZztcclxuICAgIGxvY2s6IGFueTtcclxuICAgIGVsZW1lbnRQcm9ncmVzc0JhcjogYW55O1xyXG4gICAgY3VycmVudFByb2dyZXNzOiBudW1iZXI7XHJcblxyXG4gICAgZm9yd2FyZE5hdmlnYXRvbjogQXJyYXk8UHJvZmlsZVBhZ2U+ID0gW1Byb2ZpbGVQYWdlLlByb2ZpbGUsIFByb2ZpbGVQYWdlLlNraWxsLFxyXG4gICAgUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSwgUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24sIFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHldO1xyXG5cclxuICAgIHByZXZOYXZpZ2F0b246IEFycmF5PFByb2ZpbGVQYWdlPiA9IFtQcm9maWxlUGFnZS5Qcm9maWxlLCBQcm9maWxlUGFnZS5Ta2lsbCxcclxuICAgIFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UsIFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHldO1xyXG5cclxuICAgIHRva2VuOmFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBtYXJrZXRhYmlsaXR5U2VydmljZTogTWFya2V0YWJpbGl0eVNlcnZpY2UscHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UpIHtcclxuICAgICAgXHJcbiAgICAgICB0aGlzLnRva2VuPSBnZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiKTtcclxuICAgICAgIGlmKHRoaXMudG9rZW4gPT09bnVsbClcclxuICAgICAgIHtcclxuICAgICAgICAgICAvL3Jlcm91dGUgdG8gbG9naW4gcGFnZVxyXG4gICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBQcm9maWxlUGFnZS5Qcm9maWxlO1xyXG4gICAgICAgLy8gdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIX0NPTkZJRy5jbGllbnRJRCwgQVVUSF9DT05GSUcuZG9tYWluKTtcclxuICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmZvcndhcmROYXZpZ2F0b25bMF07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSAyNTtcclxuICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICB0aGlzLmdldFByb2ZpbGUoKTtcclxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZSh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OZXh0QnV0dG9uQ2xpY2tlZChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuZm9yd2FyZE5hdmlnYXRvbi5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLmZvcndhcmROYXZpZ2F0b25bY3VycmVudEluZGV4ICsgMV07XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgKyAyNTtcclxuICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NQZXJjZW50Jykuc3R5bGUud2lkdGggPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArICclJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25QcmV2QnV0dG9uQ2xpY2tlZChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLnByZXZOYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2TmF2aWdhdG9uW2N1cnJlbnRJbmRleCAtIDFdO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG5cclxuICAgICAgICBpZiAocGFnZSA9PT0gUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IDc1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgLSAyNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1hcmtldGFiaWxpdHlDYWxjdWxhdGVkKHNjb3JlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgdGhpcy5vbk5leHRCdXR0b25DbGlja2VkKFByb2ZpbGVQYWdlLkNvbXB1dGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvZ291dEJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICBhbGVydCgnbG9nb3V0IGJ1dHRvbiBwcmVzc2VkLi4uIScpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhZ2VUaXRsZShwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1Byb2ZpbGUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdTa2lsbHMnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdFeHBlcmllbmNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnQ29tcHV0YXRpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdNYXJrZXRhYmlsaXR5JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXROYXZCdXR0b25UZXh0KHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPj0gUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnRmluaXNoJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnTmV4dCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4dHJhY3RQcm9maWxlRGF0YShwcm9maWxlOmFueSlcclxuICAgIHtcclxuICAgICAgIC8vIGFsZXJ0KHByb2ZpbGUuaWQpO1xyXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG5cclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gcHJvZmlsZS5maXJzdE5hbWUrXCIgXCIrcHJvZmlsZS5sYXN0TmFtZTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gcHJvZmlsZS5sb2NhdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhbnlJbmZvID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uU3RhcnREYXRlID0gZXhwZXJpZW5jZS5zdGFydERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2Uuc3RhcnREYXRlLnllYXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSBleHBlcmllbmNlLmVuZERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2UuZW5kRGF0ZS55ZWFyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZT0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgICAgLy8gYWxlcnQodGhpcy5jdXJyZW50UHJvZmlsZS5Qcm9maWxlLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6YW55KVxyXG4gICAge1xyXG4gICAgYWxlcnQoZXJyb3IrXCJleHRyYWN0UHJvZmlsZURhdGFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2ZpbGUoKSB7XHJcbiAgICAgICAgXHJcbnRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSh0aGlzLnRva2VuKS5zdWJzY3JpYmUoXHJcbiAgICBkYXRhID0+IHRoaXMuZXh0cmFjdFByb2ZpbGVEYXRhKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJOb2RlIEFkZGVkIENvbXBsZXRlXCIpKTtcclxuICBcclxuXHJcbiAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gXCJBbnNodWxlZVwiO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IFwiTXVtYmFpXCI7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gXCJGb3VuZGVyLCBDZW5uZXN0IFRlY2hub2xvZ2llc1wiO1xyXG4gICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsICdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgLy8gRmV0Y2ggcHJvZmlsZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIC8qIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICAgLy9jb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICB0aGlzLmxvY2suZ2V0VXNlckluZm8oYWNjZXNzVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiBcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUubmFtZTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IHByb2ZpbGUubG9jYXRpb24ubmFtZTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XHJcbiAgICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gXHJcbiAgICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkNvbXBhbnlOYW1lID0gZXhwZXJpZW5jZS5jb21wYW55Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gZXhwZXJpZW5jZS5lbmREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLmVuZERhdGUueWVhcjtcclxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiBcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgICB9KTtcclxuICovXHJcblxyXG4gICAgICAgIC8vIGR1bW15IGV4cGVyaWVuY2UgZGF0YVxyXG4gICAgICAgIGxldCBkdW1teVdvcmtFeHBzID0gQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcblxyXG4gICAgICAgIFtcIkhERkNcIiwgXCJMJlRcIiwgXCJPbW5pVGVjaFwiLCBcIkNlbm5lc3RcIl0uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29tcGFueUluZm8xID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvMS5Db21wYW55TmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlRpdGxlID0gXCJYWVpcIjtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlN0YXJ0RGF0ZSA9IFwiMDEvMDIvMjAxMVwiO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mbzEuRW5kRGF0ZSA9IFwiMzAvMDcvMjAxM1wiO1xyXG4gICAgICAgICAgICBkdW1teVdvcmtFeHBzLnB1c2goY29tcGFueUluZm8xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gZHVtbXlXb3JrRXhwcztcclxuICAgIH1cclxuXHJcbn1cclxuIl19