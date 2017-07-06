import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { Skill, ProfilePage } from '../../../app/shared';

@Component({
    selector: 'mkb-skills',
    templateUrl: 'pages/skills/skills.html',
    styleUrls: ['pages/skills/skills-common.css']
})

export class SkillsComponent implements OnInit, AfterViewInit {
    @Input() CurrentProfileSkills: Array<Skill> = Array<Skill>();
    @Output() currentPage = new EventEmitter<ProfilePage>();
    ngOnInit() {
        //   alert(this.CurrentProfileSkills);
    }
    constructor() {

    }
    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Skill);
    }
}
