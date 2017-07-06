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
        this.token = application_settings_1.getString("accesstoken");
        if (this.token === null) {
            //reroute to login page
        }
        this.currentPage = index_1.ProfilePage.Profile;
        // this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentProgress = 25;
    }
    ProfileManagerComponent.prototype.ngOnInit = function () {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    };
    ProfileManagerComponent.prototype.onNextButtonClicked = function (page) {
        this.currentPage = this.currentPage + 1;
        alert(this.currentPage);
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        if (this.currentPage === index_1.ProfilePage.Computation) {
            this.calculateMarketability();
        }
        this.currentProgress = this.currentProgress + 25;
        // document.getElementById('progressPercent').style.width = this.currentProgress + '%';
    };
    ProfileManagerComponent.prototype.onPrevButtonClicked = function (page) {
        this.currentPage = page - 1;
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress - 25;
        //document.getElementById('progressPercent').style.width = this.currentProgress + '%';
    };
    ProfileManagerComponent.prototype.calculateMarketability = function () {
        var _this = this;
        this.score = this.marketabilityService.calculateMarketability(this.currentProfile);
        setTimeout(function () {
            _this.onNextButtonClicked(_this.currentPage);
        }, 3000);
    };
    ProfileManagerComponent.prototype.onLogoutButtonClicked = function () {
        // this.authService.logout();
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
        alert(profile.id);
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
        alert(this.currentProfile.Profile.Name);
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
             userProfile.Profile.City="Mumbai";
             userProfile.Profile.Occupation="Founder, Cennest Technologies";
             ['C#', 'Java', 'JavaScript', 'Python','Ruby On Rails'].forEach(elm => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFHakIseUNBR3lCO0FBUXpCLElBQWEsdUJBQXVCO0lBWWhDLGlDQUFxQixvQkFBMEMsRUFBUyxjQUE4QjtRQUFqRix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRW5HLElBQUksQ0FBQyxLQUFLLEdBQUUsZ0NBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFJLElBQUksQ0FBQyxDQUN0QixDQUFDO1lBQ0csdUJBQXVCO1FBQzNCLENBQUM7UUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3hDLHVFQUF1RTtRQUN0RSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU5QixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsSUFBaUI7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDbEQsdUZBQXVGO0lBRTFGLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsSUFBaUI7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUNqRCxzRkFBc0Y7SUFDMUYsQ0FBQztJQUVELHdEQUFzQixHQUF0QjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25GLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWIsQ0FBQztJQUVELHVEQUFxQixHQUFyQjtRQUNHLDZCQUE2QjtJQUNoQyxDQUFDO0lBRUQsOENBQVksR0FBWixVQUFhLElBQWlCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUVELGtEQUFnQixHQUFoQixVQUFpQixJQUFpQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0RBQWtCLEdBQWxCLFVBQW1CLE9BQVc7UUFFMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLFdBQVcsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztRQUNyQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksZUFBTyxFQUFFLENBQUM7UUFDakMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBUyxDQUFDO1FBQ3hDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7UUFDMUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQWUsQ0FBQztRQUVqRSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFDLEdBQUcsR0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2xFLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDbEQsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUM5RCxJQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtZQUN2QyxJQUFNLFdBQVcsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztZQUN0QyxXQUFXLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNyQyxXQUFXLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUV2RixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixXQUFXLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNyRixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osV0FBVyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUNELFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUUsV0FBVyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsNkNBQVcsR0FBWCxVQUFZLEtBQVM7UUFFckIsS0FBSyxDQUFDLEtBQUssR0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSw0Q0FBVSxHQUFqQjtRQUFBLGlCQWlFQztRQS9ETCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUNoRCxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsRUFDN0IsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QixFQUNoQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUM7UUFHL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0RMO0lBQ0UsQ0FBQztJQUVMLDhCQUFDO0FBQUQsQ0FBQyxBQXJNRCxJQXFNQztBQXJNWSx1QkFBdUI7SUFObkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxTQUFTLEVBQUMsQ0FBQyw0QkFBb0IsRUFBQyxzQkFBYyxDQUFDO1FBQ2hELFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLDBCQUEwQixDQUFDO0tBQzVFLENBQUM7cUNBYTZDLDRCQUFvQixFQUF5QixzQkFBYztHQVo3Rix1QkFBdUIsQ0FxTW5DO0FBck1ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCAsT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgZG9ja01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IFJvdXRlciAsIEFjdGl2YXRlZFJvdXRlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtcclxuICAgIGdldEJvb2xlYW4sXHJcbiAgICBzZXRCb29sZWFuLFxyXG4gICAgZ2V0TnVtYmVyLFxyXG4gICAgc2V0TnVtYmVyLFxyXG4gICAgZ2V0U3RyaW5nLFxyXG4gICAgc2V0U3RyaW5nLFxyXG4gICAgaGFzS2V5LFxyXG4gICAgcmVtb3ZlLFxyXG4gICAgY2xlYXJcclxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgQVVUSF9DT05GSUcgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYXV0aC9hdXRoLmNvbmZpZyc7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgIFBlcnNvblByb2ZpbGUsIFNraWxsLCBQcm9maWxlLFxyXG4gICAgRXhwZXJpZW5jZSwgQ29tcGFueUluZm8sIFByb2ZpbGVQYWdlLCBNYXJrZXRhYmlsaXR5U2VydmljZSwgUHJvZmlsZVNlcnZpY2VcclxufSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xyXG5kZWNsYXJlIHZhciBBdXRoMExvY2s6IGFueTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1wcm9maWxlbWFuYWdlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOltNYXJrZXRhYmlsaXR5U2VydmljZSxQcm9maWxlU2VydmljZV0sXHJcbiAgIHN0eWxlVXJsczogW1wicGFnZXMvcHJvZmlsZW1hbmFnZXItY29tbW9uLmNzc1wiLCBcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGN1cnJlbnRQYWdlOiBQcm9maWxlUGFnZTtcclxuICAgIGN1cnJlbnRQcm9maWxlOiBQZXJzb25Qcm9maWxlO1xyXG4gICAgc2NvcmU6IHN0cmluZztcclxuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xyXG4gICAgbmF2QnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gICAgbG9jazogYW55O1xyXG4gICAgZWxlbWVudFByb2dyZXNzQmFyOiBhbnk7XHJcbiAgICBjdXJyZW50UHJvZ3Jlc3M6IG51bWJlcjtcclxuICAgIHRva2VuOmFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBtYXJrZXRhYmlsaXR5U2VydmljZTogTWFya2V0YWJpbGl0eVNlcnZpY2UscHJpdmF0ZSBwcm9maWxlU2VydmljZTogUHJvZmlsZVNlcnZpY2UpIHtcclxuICAgICAgXHJcbiAgICAgICB0aGlzLnRva2VuPSBnZXRTdHJpbmcoXCJhY2Nlc3N0b2tlblwiKTtcclxuICAgICAgIGlmKHRoaXMudG9rZW4gPT09bnVsbClcclxuICAgICAgIHtcclxuICAgICAgICAgICAvL3Jlcm91dGUgdG8gbG9naW4gcGFnZVxyXG4gICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBQcm9maWxlUGFnZS5Qcm9maWxlO1xyXG4gICAgICAgLy8gdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhBVVRIX0NPTkZJRy5jbGllbnRJRCwgQVVUSF9DT05GSUcuZG9tYWluKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IDI1O1xyXG4gICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgIHRoaXMuZ2V0UHJvZmlsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5leHRCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudFBhZ2UgKyAxO1xyXG4gICAgICAgIGFsZXJ0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PT0gUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVNYXJrZXRhYmlsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgKyAyNTtcclxuICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblByZXZCdXR0b25DbGlja2VkKHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2UgLSAxO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IHRoaXMuY3VycmVudFByb2dyZXNzIC0gMjU7XHJcbiAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NQZXJjZW50Jykuc3R5bGUud2lkdGggPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArICclJztcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVNYXJrZXRhYmlsaXR5KCkge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSB0aGlzLm1hcmtldGFiaWxpdHlTZXJ2aWNlLmNhbGN1bGF0ZU1hcmtldGFiaWxpdHkodGhpcy5jdXJyZW50UHJvZmlsZSk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25OZXh0QnV0dG9uQ2xpY2tlZCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2dvdXRCdXR0b25DbGlja2VkKCkge1xyXG4gICAgICAgLy8gdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYWdlVGl0bGUocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdQcm9maWxlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnU2tpbGxzJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnRXhwZXJpZW5jZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0NvbXB1dGF0aW9uJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnTWFya2V0YWJpbGl0eSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmF2QnV0dG9uVGV4dChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID49IFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ0ZpbmlzaCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ05leHQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0UHJvZmlsZURhdGEocHJvZmlsZTphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgYWxlcnQocHJvZmlsZS5pZCk7XHJcbiAgICAgICAgbGV0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk5hbWUgPSBwcm9maWxlLmZpcnN0TmFtZStcIiBcIitwcm9maWxlLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XHJcbiAgICAgICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsJ1J1YnkgT24gUmFpbHMnXS5mb3JFYWNoKGVsbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHByb2ZpbGUucG9zaXRpb25zLnZhbHVlcy5mb3JFYWNoKGV4cGVyaWVuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGFueUluZm8gPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkNvbXBhbnlOYW1lID0gZXhwZXJpZW5jZS5jb21wYW55Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5UaXRsZSA9IGV4cGVyaWVuY2UudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5TdGFydERhdGUgPSBleHBlcmllbmNlLnN0YXJ0RGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5zdGFydERhdGUueWVhcjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWV4cGVyaWVuY2UuaXNDdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5jdXJyZW50UHJvZmlsZS5Qcm9maWxlLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6YW55KVxyXG4gICAge1xyXG4gICAgYWxlcnQoZXJyb3IrXCJleHRyYWN0UHJvZmlsZURhdGFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2ZpbGUoKSB7XHJcbiAgICAgICAgXHJcbnRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSh0aGlzLnRva2VuKS5zdWJzY3JpYmUoXHJcbiAgICBkYXRhID0+IHRoaXMuZXh0cmFjdFByb2ZpbGVEYXRhKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJOb2RlIEFkZGVkIENvbXBsZXRlXCIpKTtcclxuICBcclxuXHJcbiAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IFwiQW5zaHVsZWVcIjtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5PVwiTXVtYmFpXCI7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbj1cIkZvdW5kZXIsIENlbm5lc3QgVGVjaG5vbG9naWVzXCI7XHJcbiAgICAgICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsJ1J1YnkgT24gUmFpbHMnXS5mb3JFYWNoKGVsbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUgPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICAvLyBGZXRjaCBwcm9maWxlIGluZm9ybWF0aW9uXHJcbiAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgLy9jb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgIHRoaXMubG9jay5nZXRVc2VySW5mbyhhY2Nlc3NUb2tlbiwgKGVycm9yLCBwcm9maWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IG5ldyBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUubmFtZTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gcHJvZmlsZS5sb2NhdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhbnlJbmZvID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uU3RhcnREYXRlID0gZXhwZXJpZW5jZS5zdGFydERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2Uuc3RhcnREYXRlLnllYXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSBleHBlcmllbmNlLmVuZERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2UuZW5kRGF0ZS55ZWFyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUgPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICB9KTtcclxuKi9cclxuICAgIH1cclxuXHJcbn1cclxuIl19