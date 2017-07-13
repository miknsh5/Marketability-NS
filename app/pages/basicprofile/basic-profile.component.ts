import { Component, Input, OnInit } from '@angular/core';
import { getString } from "application-settings";

import { Profile, PersonProfile } from '../../shared/index';

@Component({
    selector: 'mkb-basic-profile',
    templateUrl: 'pages/basicprofile/basic-profile.html',
    styleUrls: ["pages/basicprofile/basic-profile-common.css"]
})
export class BasicProfileComponent implements OnInit {

    profile: Profile;

    constructor() { }

    ngOnInit() {
        let profileInfo = getString("personProfile");
        if (profileInfo) {
            const personProfile: PersonProfile = JSON.parse(profileInfo);
            this.profile = personProfile.Profile;
        }
    }
}
