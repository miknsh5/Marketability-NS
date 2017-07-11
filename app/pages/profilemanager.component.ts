import { Component, OnInit } from "@angular/core";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";

import { Router, ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";

import "rxjs/Rx";
import { AUTH_CONFIG } from '../shared/services/auth/auth.config';
import {
    PersonProfile, Skill, Profile,
    Experience, CompanyInfo, ProfilePage, MarketabilityService, ProfileService,
} from '../shared/index';

declare var Auth0Lock: any;
@Component({
    selector: 'mkb-profilemanager',
    templateUrl: 'pages/profilemanager.html',
    providers: [MarketabilityService, ProfileService],
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

    forwardNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Computation, ProfilePage.Marketability];

    prevNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Marketability];

    token: any;

    constructor(private marketabilityService: MarketabilityService, private profileService: ProfileService) {


        this.currentPage = ProfilePage.Profile;
        // this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain);
        this.currentPage = this.forwardNavigaton[0];
        this.currentProgress = 25;

    }

    ngOnInit() {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    }

    onNextButtonClicked(page: ProfilePage) {
        const currentIndex = this.forwardNavigaton.indexOf(page);
        this.currentPage = this.forwardNavigaton[currentIndex + 1];
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        this.currentProgress = this.currentProgress + 25;
        // document.getElementById('progressPercent').style.width = this.currentProgress + '%';

    }

    onPrevButtonClicked(page: ProfilePage) {

        const currentIndex = this.prevNavigaton.indexOf(page);
        this.currentPage = this.prevNavigaton[currentIndex - 1];
        this.setPageTitle(this.currentPage);

        if (page === ProfilePage.Marketability) {
            this.currentProgress = 75;
        } else {
            this.currentProgress = this.currentProgress - 25;
        }

        this.setNavButtonText(this.currentPage);
    }

    onMarketabilityCalculated(score: string) {
        this.score = score;
        this.onNextButtonClicked(ProfilePage.Computation);
    }

    onLogoutButtonClicked() {
        // this.authService.logout();
        alert('logout button pressed...!');
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

    extractProfileData(profile: any) {
        // alert(profile.firstName);
        let userProfile = new PersonProfile();
        userProfile.Profile = new Profile();
        userProfile.Skills = new Array<Skill>();
        userProfile.Experience = new Experience();
        userProfile.Experience.WorkExperience = new Array<CompanyInfo>();

        userProfile.Profile.Name = profile.firstName + " " + profile.lastName;
        userProfile.Profile.City = profile.location.name;
        userProfile.Profile.Occupation = profile.headline;
        ['C#', 'Java', 'JavaScript', 'Python', 'Ruby On Rails'].forEach(elm => {
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
        // alert(this.currentProfile.Profile.Name);
    }
    handleError(error: any) {
        alert(error + "extractProfileData");
    }

    public getProfile() {
        // alert("get profile called");
        this.token = getString("accesstoken");
        if (this.token === null) {
            //reroute to login page
        }
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
    }

}
