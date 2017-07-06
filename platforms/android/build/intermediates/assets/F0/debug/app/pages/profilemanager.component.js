"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../shared/index");
var ProfileManagerComponent = (function () {
    function ProfileManagerComponent(marketabilityService) {
        this.marketabilityService = marketabilityService;
        this.currentPage = index_1.ProfilePage.Profile;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBS2xELHlDQUd5QjtBQVF6QixJQUFhLHVCQUF1QjtJQVdoQyxpQ0FBcUIsb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBVyxDQUFDLE9BQU8sQ0FBQztRQUV2QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsSUFBaUI7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDbEQsdUZBQXVGO0lB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QUFZLEVBQUUsUUFBUSxFQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDOUQsSUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUN0QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLDRCQUE0QjtRQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0w7SUFDRSxDQUFDO0lBRUwsOEJBQUM7QUFBRCxDQUFDLEFBNUlELElBNElDO0FBNUlZLHVCQUF1QjtJQU5uQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLFNBQVMsRUFBQyxDQUFDLDRCQUFvQixDQUFDO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLDBCQUEwQixDQUFDO0tBQzVFLENBQUM7cUNBWTZDLDRCQUFvQjtHQVh0RCx1QkFBdUIsQ0E0SW5DO0FBNUlZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCAsT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgZG9ja01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgICBQZXJzb25Qcm9maWxlLCBTa2lsbCwgUHJvZmlsZSxcclxuICAgIEV4cGVyaWVuY2UsIENvbXBhbnlJbmZvLCBQcm9maWxlUGFnZSwgTWFya2V0YWJpbGl0eVNlcnZpY2VcclxufSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xyXG5kZWNsYXJlIHZhciBBdXRoMExvY2s6IGFueTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1wcm9maWxlbWFuYWdlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOltNYXJrZXRhYmlsaXR5U2VydmljZV0sXHJcbiAgIHN0eWxlVXJsczogW1wicGFnZXMvcHJvZmlsZW1hbmFnZXItY29tbW9uLmNzc1wiLCBcInBhZ2VzL3Byb2ZpbGVtYW5hZ2VyLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZU1hbmFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIGN1cnJlbnRQYWdlOiBQcm9maWxlUGFnZTtcclxuICAgIGN1cnJlbnRQcm9maWxlOiBQZXJzb25Qcm9maWxlO1xyXG4gICAgc2NvcmU6IHN0cmluZztcclxuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xyXG4gICAgbmF2QnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gICAgbG9jazogYW55O1xyXG4gICAgZWxlbWVudFByb2dyZXNzQmFyOiBhbnk7XHJcbiAgICBjdXJyZW50UHJvZ3Jlc3M6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBtYXJrZXRhYmlsaXR5U2VydmljZTogTWFya2V0YWJpbGl0eVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gUHJvZmlsZVBhZ2UuUHJvZmlsZTtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gMjU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9maWxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZSArIDE7XHJcbiAgICAgICAgYWxlcnQodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09PSBQcm9maWxlUGFnZS5Db21wdXRhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU1hcmtldGFiaWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRQcm9ncmVzcyArIDI1O1xyXG4gICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzUGVyY2VudCcpLnN0eWxlLndpZHRoID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgKyAnJSc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldkJ1dHRvbkNsaWNrZWQocGFnZTogUHJvZmlsZVBhZ2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5zZXROYXZCdXR0b25UZXh0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFByb2dyZXNzID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3MgLSAyNTtcclxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc1BlcmNlbnQnKS5zdHlsZS53aWR0aCA9IHRoaXMuY3VycmVudFByb2dyZXNzICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZU1hcmtldGFiaWxpdHkoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHRoaXMubWFya2V0YWJpbGl0eVNlcnZpY2UuY2FsY3VsYXRlTWFya2V0YWJpbGl0eSh0aGlzLmN1cnJlbnRQcm9maWxlKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbk5leHRCdXR0b25DbGlja2VkKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvZ291dEJ1dHRvbkNsaWNrZWQoKSB7XHJcbiAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhZ2VUaXRsZShwYWdlOiBQcm9maWxlUGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVRpdGxlID0gJ1Byb2ZpbGUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdTa2lsbHMnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdFeHBlcmllbmNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVGl0bGUgPSAnQ29tcHV0YXRpb24nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICdNYXJrZXRhYmlsaXR5JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VUaXRsZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXROYXZCdXR0b25UZXh0KHBhZ2U6IFByb2ZpbGVQYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UgPj0gUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnRmluaXNoJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkJ1dHRvblRleHQgPSAnTmV4dCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9maWxlKCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlID0gbmV3IFByb2ZpbGUoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzID0gbmV3IEFycmF5PFNraWxsPigpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlID0gbmV3IEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZSA9IG5ldyBBcnJheTxDb21wYW55SW5mbz4oKTtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gXCJBbnNodWxlZVwiO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHk9XCJNdW1iYWlcIjtcclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5PY2N1cGF0aW9uPVwiRm91bmRlciwgQ2VubmVzdCBUZWNobm9sb2dpZXNcIjtcclxuICAgICAgICAgICAgWydDIycsICdKYXZhJywgJ0phdmFTY3JpcHQnLCAnUHl0aG9uJywnUnVieSBPbiBSYWlscyddLmZvckVhY2goZWxtID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gbmV3IFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5Ta2lsbE5hbWUgPSBlbG07XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMucHVzaChza2lsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgIC8vIEZldGNoIHByb2ZpbGUgaW5mb3JtYXRpb25cclxuICAgICAgIC8qIGNvbnN0IHVzZXJQcm9maWxlID0gbmV3IFBlcnNvblByb2ZpbGUoKTtcclxuICAgICAgICAvL2NvbnN0IGFjY2Vzc1Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcbiAgICAgICAgdGhpcy5sb2NrLmdldFVzZXJJbmZvKGFjY2Vzc1Rva2VuLCAoZXJyb3IsIHByb2ZpbGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUgPSBuZXcgUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Ta2lsbHMgPSBuZXcgQXJyYXk8U2tpbGw+KCk7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UgPSBuZXcgRXhwZXJpZW5jZSgpO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlID0gbmV3IEFycmF5PENvbXBhbnlJbmZvPigpO1xyXG5cclxuICAgICAgICAgICAgdXNlclByb2ZpbGUuUHJvZmlsZS5OYW1lID0gcHJvZmlsZS5uYW1lO1xyXG4gICAgICAgICAgICB1c2VyUHJvZmlsZS5Qcm9maWxlLkNpdHkgPSBwcm9maWxlLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJQcm9maWxlLlByb2ZpbGUuT2NjdXBhdGlvbiA9IHByb2ZpbGUuaGVhZGxpbmU7XHJcbiAgICAgICAgICAgIFsnQyMnLCAnSmF2YScsICdKYXZhU2NyaXB0JywgJ1B5dGhvbicsJ1J1YnkgT24gUmFpbHMnXS5mb3JFYWNoKGVsbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBza2lsbCA9IG5ldyBTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuU2tpbGxOYW1lID0gZWxtO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuU2tpbGxzLnB1c2goc2tpbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHByb2ZpbGUucG9zaXRpb25zLnZhbHVlcy5mb3JFYWNoKGV4cGVyaWVuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tcGFueUluZm8gPSBuZXcgQ29tcGFueUluZm8oKTtcclxuICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkNvbXBhbnlOYW1lID0gZXhwZXJpZW5jZS5jb21wYW55Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5UaXRsZSA9IGV4cGVyaWVuY2UudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBjb21wYW55SW5mby5TdGFydERhdGUgPSBleHBlcmllbmNlLnN0YXJ0RGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5zdGFydERhdGUueWVhcjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWV4cGVyaWVuY2UuaXNDdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUluZm8uRW5kRGF0ZSA9IGV4cGVyaWVuY2UuZW5kRGF0ZS5tb250aCArICcgLyAnICsgZXhwZXJpZW5jZS5lbmREYXRlLnllYXI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlJbmZvLkVuZERhdGUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB1c2VyUHJvZmlsZS5FeHBlcmllbmNlLldvcmtFeHBlcmllbmNlLnB1c2goY29tcGFueUluZm8pO1xyXG4gICAgICAgICAgICAgICAgdXNlclByb2ZpbGUuRXhwZXJpZW5jZS5Xb3JrRXhwZXJpZW5jZS5wdXNoKGNvbXBhbnlJbmZvKTtcclxuICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlLkV4cGVyaWVuY2UuV29ya0V4cGVyaWVuY2UucHVzaChjb21wYW55SW5mbyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UHJvZmlsZSA9IHVzZXJQcm9maWxlO1xyXG4gICAgICAgIH0pO1xyXG4qL1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=