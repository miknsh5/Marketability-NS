import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { NavigationExtras } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { hasKey, getString, setString, remove } from "application-settings";
import "rxjs/Rx";
import * as tnsOAuthModule from 'nativescript-oauth';
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

import { AUTH_CONFIG } from '../shared/services/auth/auth.config';
import { Page } from "ui/page";
import {
    PersonProfile, Skill, Profile, Experience, CompanyInfo,
    ProfilePage, MarketabilityService, ProfileService,
} from '../shared/index';

declare var Auth0Lock: any;

@Component({
    selector: 'mkb-profilemanager',
    templateUrl: 'pages/profilemanager.html',
    providers: [MarketabilityService, ProfileService],
    styleUrls: ["pages/profilemanager-common.css", "pages/profilemanager.css"]
})
export class ProfileManagerComponent implements OnInit, OnDestroy {

    currentPage: ProfilePage;
    score: string;
    pageTitle: string;
    navButtonText: string;
    lock: any;
    elementProgressBar: any;
    currentProgress: number;
    personProfile: PersonProfile;

    forwardNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Computation, ProfilePage.Marketability];

    prevNavigaton: Array<ProfilePage> = [ProfilePage.Profile, ProfilePage.Skill,
    ProfilePage.Experience, ProfilePage.Marketability];

    token: any;

    constructor(private marketabilityService: MarketabilityService, private profileService: ProfileService,
        private router: RouterExtensions) {
        this.currentPage = ProfilePage.Profile;
        this.currentPage = this.forwardNavigaton[0];
        this.currentProgress = 25;
    }

    ngOnInit() {
        this.getProfile();
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);

        if (isAndroid) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.currentPage !== ProfilePage.Profile) {
                    data.cancel = true;
                    this.onPrevButtonClicked(this.currentPage);
                }
            });
        }
    }

    ngOnDestroy() {
        if (isAndroid) {
            application.android.off(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.currentPage !== ProfilePage.Profile) {
                    data.cancel = true;
                    this.onPrevButtonClicked(this.currentPage);
                }
            });
        }
    }

    onNextButtonClicked(page: ProfilePage) {
        const currentIndex = this.forwardNavigaton.indexOf(page);
        this.currentPage = this.forwardNavigaton[currentIndex + 1];
        this.currentProgress = this.currentProgress + 25;
        this.navigateToCurrentPage(this.currentPage);
    }

    onPrevButtonClicked(page: ProfilePage) {
        const currentIndex = this.prevNavigaton.indexOf(page);
        this.currentPage = this.prevNavigaton[currentIndex - 1];

        if (page === ProfilePage.Marketability) {
            this.currentProgress = 75;
        } else {
            this.currentProgress = this.currentProgress - 25;
        }
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
        if (page === ProfilePage.Marketability) {
            this.router.back();
        }
        this.router.back();
    }

    calculateMarketability() {
        setTimeout(() => {
            this.score = this.marketabilityService.calculateMarketability(this.personProfile);
            this.currentPage = ProfilePage.Computation;
            this.onNextButtonClicked(ProfilePage.Computation);
        }, 2000);
    }

    onLogoutButtonClicked() {
        tnsOAuthModule.logout();
        remove("accesstoken");
        remove("personProfile");
        this.router.navigate([''], { clearHistory: true });
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
        });
        this.personProfile = userProfile;
        setString("personProfile", JSON.stringify(this.personProfile));
        this.navigateToCurrentPage(this.currentPage);
    }

    handleError(error: any) {
        alert('Error while fetching profile' + error);
    }

    public getProfile() {
        this.token = getString("accesstoken");

        this.profileService.getProfile(this.token).subscribe(
            data => this.extractProfileData(data),
            error => this.handleError(error),
            () => console.log("Node Added Complete"));
    }

    private navigateToCurrentPage(currentPage: ProfilePage) {
        switch (currentPage) {
            case ProfilePage.Profile:
                this.router.navigate(['home/basicprofile']);
                break;
            case ProfilePage.Skill:
                this.router.navigate(["home/skills"]);
                break;
            case ProfilePage.Experience:
                this.router.navigate(["home/experience"]);
                break;
            case ProfilePage.Computation:
                this.router.navigate(["home/calculation"]);
                this.calculateMarketability();
                break;
            case ProfilePage.Marketability:
                this.router.navigate(["home/score"], { queryParams: { "score": this.score } });
                break;
            default:
                this.router.navigate([""]);
                break;
        }
        this.setPageTitle(this.currentPage);
        this.setNavButtonText(this.currentPage);
    }

}
