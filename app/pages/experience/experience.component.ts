import { Component, OnInit } from '@angular/core';
import { getString } from "application-settings";

import { Experience, PersonProfile } from '../../shared/index';

@Component({
  selector: 'mkb-experience',
  templateUrl: 'pages/experience/experience.html',
  styleUrls: ['pages/experience/experience-common.css']
})

export class ExperienceComponent implements OnInit {

  CurrentProfileExperience: Experience;

  constructor() { }

  ngOnInit() {
    let profileInfo = getString("personProfile");
    if (profileInfo) {
      const personProfile: PersonProfile = JSON.parse(profileInfo);
      this.CurrentProfileExperience = personProfile.Experience;
    }
  }
}