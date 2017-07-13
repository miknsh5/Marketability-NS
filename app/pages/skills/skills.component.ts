import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getString } from "application-settings";

import { Skill, PersonProfile } from '../../../app/shared';

@Component({
    selector: 'mkb-skills',
    templateUrl: 'pages/skills/skills.html',
    styleUrls: ['pages/skills/skills-common.css']
})

export class SkillsComponent implements OnInit {
    CurrentProfileSkills: Array<Skill> = Array<Skill>();

    constructor() { }

    ngOnInit() {
        const profileInfo = getString('personProfile');
        if (profileInfo) {
            const personProfile: PersonProfile = JSON.parse(profileInfo);
            this.CurrentProfileSkills = personProfile.Skills;
        }
    }
}
