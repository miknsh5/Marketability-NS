import { Component ,OnInit } from "@angular/core";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { Router , ActivatedRoute} from "@angular/router";
import {Page} from "ui/page";


import "rxjs/Rx";
import { AUTH_CONFIG } from '../shared/services/auth/auth.config';
import {
     PersonProfile, Skill, Profile,
    Experience, CompanyInfo, ProfilePage, MarketabilityService, ProfileService
} from '../shared/index';
declare var Auth0Lock: any;
@Component({
    selector: 'mkb-profilemanager',
    templateUrl: 'pages/profilemanager.html',
    providers:[MarketabilityService,ProfileService],
   styleUrls: ["pages/profilemanager-common.css", "pages/profilemanager.css"]
})
export class ProfileManagerComponent implements OnInit {

    currentPage: ProfilePage;
    currentProfile: PersonProfile;
    score: string;
    pageTitle: string;
    navButtonText: string;
    lock: any;
    elementProgressBar: any;
    currentProgress: number;
    token:any;

    constructor(private route: ActivatedRoute, private marketabilityService: MarketabilityService,private profileService: ProfileService) {
       this.route.queryParams.subscribe(params => {
            this.token = params["accesstoken"];
            console.log(this.token);
         //alert("token recieved by profile manage"+this.token);
        });
        this.currentPage = ProfilePage.Profile;
       // this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentProgress = 25;
        
    }

    ngOnInit() {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    }

    onNextButtonClicked(page: ProfilePage) {
        this.currentPage = this.currentPage + 1;
        alert(this.currentPage);
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        if (this.currentPage === ProfilePage.Computation) {
            this.calculateMarketability();
        }
        this.currentProgress = this.currentProgress + 25;
       // document.getElementById('progressPercent').style.width = this.currentProgress + '%';

    }

    onPrevButtonClicked(page: ProfilePage) {
        this.currentPage = page - 1;
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress - 25;
        //document.getElementById('progressPercent').style.width = this.currentProgress + '%';
    }

    calculateMarketability() {
        this.score = this.marketabilityService.calculateMarketability(this.currentProfile);
        setTimeout(() => {
            this.onNextButtonClicked(this.currentPage);
        }, 3000);

    }

    onLogoutButtonClicked() {
       // this.authService.logout();
    }

    setPageTitle(page: ProfilePage) {
        if (page === 0) {
            this.pageTitle = 'Profile';
        } else if (page === 1) {
            this.pageTitle = 'Skills';
        } else if (page === 2) {
            this.pageTitle = 'Experience';
        } else if (page === 3) {
            this.pageTitle = 'Computation';
        } else if (page === 4) {
            this.pageTitle = 'Marketability';
        } else {
            this.pageTitle = '';
        }
    }

    setNavButtonText(page: ProfilePage) {
        if (page >= ProfilePage.Experience) {
            this.navButtonText = 'Finish';
        } else {
            this.navButtonText = 'Next';
        }
    }

    extractProfileData(profile:any)
    {
        alert(profile.name);
        const userProfile = new PersonProfile();
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
            this.currentProfile= userProfile;
    }
    handleError(error:any)
    {
alert(error);
    }

    public getProfile() {
        
this.profileService.getProfile(this.token).subscribe(
    data => this.extractProfileData(data),
            error => this.handleError(error),
            () => console.log("Node Added Complete"));
  

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
    }

}
