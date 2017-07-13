import { Component, Input, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { getString } from "application-settings";

import { PersonProfile, MarketabilityService } from '../../shared/index';

@Component({
    selector: 'mkb-calculation',
    templateUrl: 'pages/calculation/calculation.html',
    styleUrls: ["pages/calculation/calculation-common.css"]
})

export class CalculationComponent implements OnInit {

    profile: PersonProfile;

    constructor(private marketabilityService: MarketabilityService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        const profileInfo = getString('personProfile');
        if (profileInfo) {
            const personProfile: PersonProfile = JSON.parse(profileInfo);
            this.profile = personProfile;
            setTimeout(() => {
                let score = this.marketabilityService.calculateMarketability(this.profile);
                this.router.navigate(["profile/score", score])
            }, 2000);
        }
    }


}
