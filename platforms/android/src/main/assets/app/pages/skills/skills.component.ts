import { Component, Input,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Page} from "ui/page";
import { Skill } from "../../../app/shared";
@Component({
    selector: 'mkb-skills',
    templateUrl: 'pages/skills/skills.html',
    styleUrls: ["pages/skills/skills-common.css"]
})
export class SkillsComponent implements OnInit{
 @Input() CurrentProfileSkills: Array<Skill> = Array<Skill>();
  ngOnInit()
 {
  alert("Skills");
 }
   
    constructor() {
   
    }
}
