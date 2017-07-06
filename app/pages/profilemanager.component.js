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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELDZEQVU4QjtBQUU5QixtQkFBaUI7QUFHakIseUNBR3lCO0FBUXpCLElBQWEsdUJBQXVCO0lBWWhDLGlDQUFxQixvQkFBMEMsRUFBUyxjQUE4QjtRQUFqRix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQVMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRW5HLElBQUksQ0FBQyxLQUFLLEdBQUUsZ0NBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFJLElBQUksQ0FBQyxDQUN0QixDQUFDO1lBQ0csdUJBQXVCO1FBQzNCLENBQUM7UUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3hDLHVFQUF1RTtRQUN0RSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUU5QixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsSUFBaUI7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FB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Ozs7R0F3REw7SUFDRSxDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBck1ELElBcU1DO0FBck1ZLHVCQUF1QjtJQU5uQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBQyxDQUFDLDRCQUFvQixFQUFDLHNCQUFjLENBQUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUM7S0FDNUUsQ0FBQztxQ0FhNkMsNEJBQW9CLEVBQXlCLHNCQUFjO0dBWjdGLHVCQUF1QixDQXFNbkM7QUFyTVksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICxPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBkb2NrTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgUm91dGVyICwgQWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgZ2V0Qm9vbGVhbixcclxuICAgIHNldEJvb2xlYW4sXHJcbiAgICBnZXROdW1iZXIsXHJcbiAgICBzZXROdW1iZXIsXHJcbiAgICBnZXRTdHJpbmcsXHJcbiAgICBzZXRTdHJpbmcsXHJcbiAgICBoYXNLZXksXHJcbiAgICByZW1vdmUsXHJcbiAgICBjbGVhclxyXG59IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBBVVRIX0NPTkZJRyB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoL2F1dGguY29uZmlnJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICAgUGVyc29uUHJvZmlsZSwgU2tpbGwsIFByb2ZpbGUsXHJcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLCBQcm9maWxlU2VydmljZVxyXG59IGZyb20gJy4uL3NoYXJlZC9pbmRleCc7XHJcbmRlY2xhcmUgdmFyIEF1dGgwTG9jazogYW55O1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXByb2ZpbGVtYW5hZ2VyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAncGFnZXMvcHJvZmlsZW1hbmFnZXIuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6W01hcmtldGFiaWxpdHlTZXJ2aWNlLFByb2ZpbGVTZXJ2aWNlXSxcclxuICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9wcm9maWxlbWFuYWdlci1jb21tb24uY3NzXCIsIFwicGFnZXMvcHJvZmlsZW1hbmFnZXIuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlTWFuYWdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgY3VycmVudFBhZ2U6IFByb2ZpbGVQYWdlO1xyXG4gICAgY3VycmVudFByb2ZpbGU6IFBlcnNvblByb2ZpbGU7XHJcbiAgICBzY29yZTogc3RyaW5nO1xyXG4gICAgcGFnZVRpdGxlOiBzdHJpbmc7XHJcbiAgICBuYXZCdXR0b25UZXh0OiBzdHJpbmc7XHJcbiAgICBsb2NrOiBhbnk7XHJcbiAgICBlbGVtZW50UHJvZ3Jlc3NCYXI6IGFueTtcclxuICAgIGN1cnJlbnRQcm9ncmVzczogbnVtYmVyO1xyXG4gICAgdG9rZW46YW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIG1hcmtldGFiaWxpdHlTZXJ2aWNlOiBNYXJrZXRhYmlsaXR5U2VydmljZSxwcml2YXRlIHByb2ZpbGVTZXJ2aWNlOiBQcm9maWxlU2VydmljZSkge1xyXG4gICAgICBcclxuICAgICAgIHRoaXMudG9rZW49IGdldFN0cmluZyhcImFjY2Vzc3Rva2VuXCIpO1xyXG4gICAgICAgaWYodGhpcy50b2tlbiA9PT1udWxsKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgIC8vcmVyb3V0ZSB0byBsb2dpbiBwYWdlXHJcbiAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IFByb2ZpbGVQYWdlLlByb2ZpbGU7XHJcbiAgICAgICAvLyB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKEFVVEhfQ09ORklHLmNsaWVudElELCBBVVRIX0NPTkZJRy5kb21haW4pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XHJcbiAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgdGhpcy5nZXRQcm9maWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSArIDE7XHJcbiAgICAgICAgYWxlcnQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09PSBQcm9maWxlUGFnZS5Db21wdXRhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU1hcmtldGFiaWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xyXG4gICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzUGVyY2VudCcpLnN0eWxlLndpZHRoID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgKyAnJSc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldkJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgLSAyNTtcclxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZU1hcmtldGFiaWxpdHkoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHRoaXMubWFya2V0YWJpbGl0eVNlcnZpY2UuY2FsY3VsYXRlTWFya2V0YWJpbGl0eSh0aGlzLmN1cnJlbnRQcm9maWxlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHRCdXR0b25DbGlja2VkKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvZ291dEJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhZ2VUaXRsZShwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1Byb2ZpbGUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdTa2lsbHMnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdFeHBlcmllbmNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnQ29tcHV0YXRpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdNYXJrZXRhYmlsaXR5JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXROYXZCdXR0b25UZXh0KHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPj0gUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnRmluaXNoJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnTmV4dCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4dHJhY3RQcm9maWxlRGF0YShwcm9maWxlOmFueSlcclxuICAgIHtcclxuICAgICAgIC8vIGFsZXJ0KHByb2ZpbGUuaWQpO1xyXG4gICAgICAgIGxldCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG5cclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gcHJvZmlsZS5maXJzdE5hbWUrXCIgXCIrcHJvZmlsZS5sYXN0TmFtZTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gcHJvZmlsZS5sb2NhdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhbnlJbmZvID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uU3RhcnREYXRlID0gZXhwZXJpZW5jZS5zdGFydERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2Uuc3RhcnREYXRlLnllYXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSBleHBlcmllbmNlLmVuZERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2UuZW5kRGF0ZS55ZWFyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZT0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgICAgLy8gYWxlcnQodGhpcy5jdXJyZW50UHJvZmlsZS5Qcm9maWxlLk5hbWUpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6YW55KVxyXG4gICAge1xyXG4gICAgYWxlcnQoZXJyb3IrXCJleHRyYWN0UHJvZmlsZURhdGFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb2ZpbGUoKSB7XHJcbiAgICAgICAgXHJcbnRoaXMucHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSh0aGlzLnRva2VuKS5zdWJzY3JpYmUoXHJcbiAgICBkYXRhID0+IHRoaXMuZXh0cmFjdFByb2ZpbGVEYXRhKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSxcclxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJOb2RlIEFkZGVkIENvbXBsZXRlXCIpKTtcclxuICBcclxuXHJcbiAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscyA9IG5ldyBBcnJheTxTa2lsbD4oKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZSA9IG5ldyBFeHBlcmllbmNlKCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IFwiQW5zaHVsZWVcIjtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5PVwiTXVtYmFpXCI7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbj1cIkZvdW5kZXIsIENlbm5lc3QgVGVjaG5vbG9naWVzXCI7XHJcbiAgICAgICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsJ1J1YnkgT24gUmFpbHMnXS5mb3JFYWNoKGVsbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUgPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICAvLyBGZXRjaCBwcm9maWxlIGluZm9ybWF0aW9uXHJcbiAgICAgICAvKiBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgLy9jb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgIHRoaXMubG9jay5nZXRVc2VySW5mbyhhY2Nlc3NUb2tlbiwgKGVycm9yLCBwcm9maWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IG5ldyBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUubmFtZTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5DaXR5ID0gcHJvZmlsZS5sb2NhdGlvbi5uYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLk9jY3VwYXRpb24gPSBwcm9maWxlLmhlYWRsaW5lO1xyXG4gICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGwgPSBuZXcgU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLlNraWxsTmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhbnlJbmZvID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5Db21wYW55TmFtZSA9IGV4cGVyaWVuY2UuY29tcGFueS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgY29tcGFueUluZm8uU3RhcnREYXRlID0gZXhwZXJpZW5jZS5zdGFydERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2Uuc3RhcnREYXRlLnllYXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSBleHBlcmllbmNlLmVuZERhdGUubW9udGggKyAnIC8gJyArIGV4cGVyaWVuY2UuZW5kRGF0ZS55ZWFyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFByb2ZpbGUgPSB1c2VyUHJvZmlsZTtcclxuICAgICAgICB9KTtcclxuKi9cclxuICAgIH1cclxuXHJcbn1cclxuIl19