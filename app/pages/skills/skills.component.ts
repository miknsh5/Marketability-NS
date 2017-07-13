import { Component, OnInit } from '@angular/core';
import { getString } from "application-settings";

import { Skill, PersonProfile } from '../../shared/index';

@Component({
    selector: 'mkb-skills',
    templateUrl: 'pages/skills/skills.html',
    styleUrls: ['pages/skills/skills-common.css']
})

export class SkillsComponent implements OnInit {

    CurrentProfileSkills: Array<Skill> = Array<Skill>();

    constructor() { }

    ngOnInit() {
        let profileInfo = getString("personProfile");
        if (profileInfo) {
            const personProfile: PersonProfile = JSON.parse(profileInfo);
            this.CurrentProfileSkills = personProfile.Skills;
        }
    }

}
