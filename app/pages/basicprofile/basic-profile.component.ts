import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { ProfilePage, Profile } from '../../shared/index';
@Component({
    selector: 'mkb-basic-profile',
    templateUrl: 'pages/basicprofile/basic-profile.html',
    styleUrls: ["pages/basicprofile/basic-profile-common.css"]
})
export class BasicProfileComponent implements OnInit {

    // @Input() profile;
    profile: Profile;

    constructor(private router: ActivatedRoute) {
        this.profile = new Profile();
        this.router.params.subscribe((params) => {
            this.profile = params["profile"];
            alert(this.profile);
        });

    }

    ngOnInit() {
    }
}
