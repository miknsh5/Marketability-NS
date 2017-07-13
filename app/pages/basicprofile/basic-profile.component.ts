import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { ProfilePage, Profile, ProfileData, PersonProfile } from '../../shared/index';
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
        // console.log(profileData);
        //this.profile = this.profileData.personProfile.Profile;
        
    }

    ngOnInit() {
        
        let profileInfo=getString("personProfile");
        let personProfile:PersonProfile=JSON.parse(profileInfo);
        this.profile=personProfile.Profile;
        alert(this.profile);
    }
}
