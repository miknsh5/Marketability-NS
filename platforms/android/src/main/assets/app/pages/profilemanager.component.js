"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../shared/index");
var ProfileManagerComponent = (function () {
    function ProfileManagerComponent(marketabilityService) {
        this.marketabilityService = marketabilityService;
        this.forwardNavigaton = [index_1.ProfilePage.Profile, index_1.ProfilePage.Skill,
            index_1.ProfilePage.Experience, index_1.ProfilePage.Computation, index_1.ProfilePage.Marketability];
        this.prevNavigaton = [index_1.ProfilePage.Profile, index_1.ProfilePage.Skill,
            index_1.ProfilePage.Experience, index_1.ProfilePage.Marketability];
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
    ProfileManagerComponent.prototype.getProfile = function () {
        var userProfile = new index_1.PersonProfile();
        userProfile.Profile = new index_1.Profile();
        userProfile.Skills = new Array();
        userProfile.Experience = new index_1.Experience();
        userProfile.Experience.WorkExperience = new Array();
        userProfile.Profile.Name = "Anshulee";
        userProfile.Profile.City = "Mumbai";
        userProfile.Profile.Occupation = "Founder, Cennest Technologies";
        ['C#', 'Java', 'JavaScript', 'Python', 'Ruby On Rails'].forEach(function (elm) {
            var skill = new index_1.Skill();
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
        providers: [index_1.MarketabilityService],
        styleUrls: ["pages/profilemanager-common.css", "pages/profilemanager.css"]
    }),
    __metadata("design:paramtypes", [index_1.MarketabilityService])
], ProfileManagerComponent);
exports.ProfileManagerComponent = ProfileManagerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBSWxELHlDQUd5QjtBQVF6QixJQUFhLHVCQUF1QjtJQWdCaEMsaUNBQW9CLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBTjlELHFCQUFnQixHQUF1QixDQUFDLG1CQUFXLENBQUMsT0FBTyxFQUFFLG1CQUFXLENBQUMsS0FBSztZQUM5RSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxtQkFBVyxDQUFDLFdBQVcsRUFBRSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVFLGtCQUFhLEdBQXVCLENBQUMsbUJBQVcsQ0FBQyxPQUFPLEVBQUUsbUJBQVcsQ0FBQyxLQUFLO1lBQzNFLG1CQUFXLENBQUMsVUFBVSxFQUFFLG1CQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLElBQWlCO1FBQ2pDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxH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QVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3BDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBQ2xFLENBQUM7SUFFTCw4QkFBQztBQUFELENBQUMsQUFoS0QsSUFnS0M7QUFoS1ksdUJBQXVCO0lBTm5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsNEJBQW9CLENBQUM7UUFDakMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUM7S0FDN0UsQ0FBQztxQ0FpQjRDLDRCQUFvQjtHQWhCckQsdUJBQXVCLENBZ0tuQztBQWhLWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGRvY2tNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgUGVyc29uUHJvZmlsZSwgU2tpbGwsIFByb2ZpbGUsXHJcbiAgICBFeHBlcmllbmNlLCBDb21wYW55SW5mbywgUHJvZmlsZVBhZ2UsIE1hcmtldGFiaWxpdHlTZXJ2aWNlLFxyXG59IGZyb20gJy4uL3NoYXJlZC9pbmRleCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXByb2ZpbGVtYW5hZ2VyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAncGFnZXMvcHJvZmlsZW1hbmFnZXIuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtNYXJrZXRhYmlsaXR5U2VydmljZV0sXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9wcm9maWxlbWFuYWdlci5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVNYW5hZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBjdXJyZW50UGFnZTogUHJvZmlsZVBhZ2U7XHJcbiAgICBjdXJyZW50UHJvZmlsZTogUGVyc29uUHJvZmlsZTtcclxuICAgIHNjb3JlOiBzdHJpbmc7XHJcbiAgICBwYWdlVGl0bGU6IHN0cmluZztcclxuICAgIG5hdkJ1dHRvblRleHQ6IHN0cmluZztcclxuICAgIGxvY2s6IGFueTtcclxuICAgIGVsZW1lbnRQcm9ncmVzc0JhcjogYW55O1xyXG4gICAgY3VycmVudFByb2dyZXNzOiBudW1iZXI7XHJcbiAgICBmb3J3YXJkTmF2aWdhdG9uOiBBcnJheTxQcm9maWxlUGFnZT4gPSBbUHJvZmlsZVBhZ2UuUHJvZmlsZSwgUHJvZmlsZVBhZ2UuU2tpbGwsXHJcbiAgICBQcm9maWxlUGFnZS5FeHBlcmllbmNlLCBQcm9maWxlUGFnZS5Db21wdXRhdGlvbiwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgcHJldk5hdmlnYXRvbjogQXJyYXk8UHJvZmlsZVBhZ2U+ID0gW1Byb2ZpbGVQYWdlLlByb2ZpbGUsIFByb2ZpbGVQYWdlLlNraWxsLFxyXG4gICAgUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSwgUHJvZmlsZVBhZ2UuTWFya2V0YWJpbGl0eV07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZXRhYmlsaXR5U2VydmljZTogTWFya2V0YWJpbGl0eVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uWzBdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9maWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmZvcndhcmROYXZpZ2F0b24uaW5kZXhPZihwYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5mb3J3YXJkTmF2aWdhdG9uW2N1cnJlbnRJbmRleCArIDFdO1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TmF2QnV0dG9uVGV4dCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgMjU7XHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzUGVyY2VudCcpLnN0eWxlLndpZHRoID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgKyAnJSc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldkJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5wcmV2TmF2aWdhdG9uLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucHJldk5hdmlnYXRvbltjdXJyZW50SW5kZXggLSAxXTtcclxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZSh0aGlzLmN1cnJlbnRQYWdlKTtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2UgPT09IFByb2ZpbGVQYWdlLk1hcmtldGFiaWxpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSA3NTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQcm9ncmVzcyA9IHRoaXMuY3VycmVudFByb2dyZXNzIC0gMjU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldE5hdkJ1dHRvblRleHQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25NYXJrZXRhYmlsaXR5Q2FsY3VsYXRlZChzY29yZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIHRoaXMub25OZXh0QnV0dG9uQ2xpY2tlZChQcm9maWxlUGFnZS5Db21wdXRhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2dvdXRCdXR0b25DbGlja2VkKCkge1xyXG4gICAgICAgIC8vIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgICAgYWxlcnQoJ2xvZ291dCBidXR0b24gcHJlc3NlZC4uLiEnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYWdlVGl0bGUocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdQcm9maWxlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnU2tpbGxzJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnRXhwZXJpZW5jZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlID09PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ0NvbXB1dGF0aW9uJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnTWFya2V0YWJpbGl0eSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmF2QnV0dG9uVGV4dChwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID49IFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ0ZpbmlzaCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXZCdXR0b25UZXh0ID0gJ05leHQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvZmlsZSgpIHtcclxuICAgICAgICBjb25zdCB1c2VyUHJvZmlsZSA9IG5ldyBQZXJzb25Qcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gXCJBbnNodWxlZVwiO1xyXG4gICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IFwiTXVtYmFpXCI7XHJcbiAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uID0gXCJGb3VuZGVyLCBDZW5uZXN0IFRlY2hub2xvZ2llc1wiO1xyXG4gICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsICdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQcm9maWxlID0gdXNlclByb2ZpbGU7XHJcbiAgICAgICAgLy8gRmV0Y2ggcHJvZmlsZSBpbmZvcm1hdGlvblxyXG4gICAgICAgIC8qIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICAgLy9jb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICB0aGlzLmxvY2suZ2V0VXNlckluZm8oYWNjZXNzVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZSA9IG5ldyBQcm9maWxlKCk7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UgPSBuZXcgQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcbiBcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuTmFtZSA9IHByb2ZpbGUubmFtZTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuQ2l0eSA9IHByb2ZpbGUubG9jYXRpb24ubmFtZTtcclxuICAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XHJcbiAgICAgICAgICAgICBbJ0MjJywgJ0phdmEnLCAnSmF2YVNjcmlwdCcsICdQeXRob24nLCdSdWJ5IE9uIFJhaWxzJ10uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLlNraWxscy5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gXHJcbiAgICAgICAgICAgICBwcm9maWxlLnBvc2l0aW9ucy52YWx1ZXMuZm9yRWFjaChleHBlcmllbmNlID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBjb21wYW55SW5mbyA9IG5ldyBDb21wYW55SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkNvbXBhbnlOYW1lID0gZXhwZXJpZW5jZS5jb21wYW55Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uVGl0bGUgPSBleHBlcmllbmNlLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLlN0YXJ0RGF0ZSA9IGV4cGVyaWVuY2Uuc3RhcnREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLnN0YXJ0RGF0ZS55ZWFyO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgaWYgKCFleHBlcmllbmNlLmlzQ3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gZXhwZXJpZW5jZS5lbmREYXRlLm1vbnRoICsgJyAvICcgKyBleHBlcmllbmNlLmVuZERhdGUueWVhcjtcclxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb21wYW55SW5mby5FbmREYXRlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiBcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgICB9KTtcclxuICovXHJcblxyXG4gICAgICAgIC8vIGR1bW15IGV4cGVyaWVuY2UgZGF0YVxyXG4gICAgICAgIGxldCBkdW1teVdvcmtFeHBzID0gQXJyYXk8Q29tcGFueUluZm8+KCk7XHJcblxyXG4gICAgICAgIFtcIkhERkNcIiwgXCJMJlRcIiwgXCJPbW5pVGVjaFwiLCBcIkNlbm5lc3RcIl0uZm9yRWFjaChlbG0gPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29tcGFueUluZm8xID0gbmV3IENvbXBhbnlJbmZvKCk7XHJcbiAgICAgICAgICAgIGNvbXBhbnlJbmZvMS5Db21wYW55TmFtZSA9IGVsbTtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlRpdGxlID0gXCJYWVpcIjtcclxuICAgICAgICAgICAgY29tcGFueUluZm8xLlN0YXJ0RGF0ZSA9IFwiMDEvMDIvMjAxMVwiO1xyXG4gICAgICAgICAgICBjb21wYW55SW5mbzEuRW5kRGF0ZSA9IFwiMzAvMDcvMjAxM1wiO1xyXG4gICAgICAgICAgICBkdW1teVdvcmtFeHBzLnB1c2goY29tcGFueUluZm8xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gZHVtbXlXb3JrRXhwcztcclxuICAgIH1cclxuXHJcbn1cclxuIl19