import { Component, Input, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { PersonProfile, MarketabilityService, ProfilePage } from '../../shared/index';

@Component({
    selector: 'mkb-calculation',
    templateUrl: 'pages/calculation/calculation.html',
    styleUrls: ["pages/calculation/calculation-common.css"]
})

export class CalculationComponent implements OnInit {

    @Input() CurrentPersonProfile: PersonProfile;
    @Output() onscore = new EventEmitter<string>();
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor(private marketabilityService: MarketabilityService) {

    }

    ngOnInit(): void {

        setTimeout(() => {
            let score = this.marketabilityService.calculateMarketability(this.CurrentPersonProfile);
            this.onscore.emit(score);
        }, 2000);
    }


}
