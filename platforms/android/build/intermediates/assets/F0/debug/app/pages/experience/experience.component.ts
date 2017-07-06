import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Experience, ProfilePage } from '../../shared/index';

@Component({
    selector: 'mkb-experience',
    templateUrl: 'pages/experience/experience.html',
    styleUrls: ['pages/experience/experience-common.css']
})

export class ExperienceComponent implements AfterViewInit {

  @Input() CurrentProfileExperience: Experience;
  @Output() currentPage = new EventEmitter<ProfilePage>();

  constructor() {

  }
  ngAfterViewInit() {
    this.currentPage.emit(ProfilePage.Experience);
  }
}