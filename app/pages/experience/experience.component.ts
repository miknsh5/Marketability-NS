import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Experience, ProfilePage } from '../../shared/index';

@Component({
  selector: 'mkb-experience',
  templateUrl: 'pages/experience/experience.html',
  styleUrls: ['pages/experience/experience-common.css']
})

export class ExperienceComponent {

  @Input() CurrentProfileExperience: Experience;

  constructor() {

  }
}