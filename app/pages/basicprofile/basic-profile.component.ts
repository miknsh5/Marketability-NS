import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { ProfilePage, Profile, ProfileData } from '../../shared/index';

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: 'pages/basicprofile/basic-profile.html',
    styleUrls: ["pages/basicprofile/basic-profile-common.css"]
})
export class BasicProfileComponent implements OnInit {

    // @Input() profile;
    profile: Profile;

    constructor(private profileData: ProfileData) {
        console.log('-----------BasicProfileComponent------------')
        console.log(profileData);
        //this.profile = this.profileData.personProfile.Profile;
        
    }

    ngOnInit() {
        alert();
    }
}
