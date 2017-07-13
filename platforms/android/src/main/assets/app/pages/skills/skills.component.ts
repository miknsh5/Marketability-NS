import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { Skill, ProfilePage } from '../../../app/shared';
import {  Profile, ProfileData, PersonProfile } from '../../shared/index';
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
    selector: 'mkb-skills',
    templateUrl: 'pages/skills/skills.html',
    styleUrls: ['pages/skills/skills-common.css']
})

export class SkillsComponent implements OnInit {
     CurrentProfileSkills: Array<Skill> = Array<Skill>();

    ngOnInit() {
        //   alert(this.CurrentProfileSkills);
          let profileInfo=getString("personProfile");
        let personProfile:PersonProfile=JSON.parse(profileInfo);
        this.CurrentProfileSkills=personProfile.Skills;
    }
    constructor() {

    }
}
