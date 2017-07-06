import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { ProfilePage } from '../../shared/index';

@Component({
    selector: 'mkb-score',
    templateUrl: 'pages/score/score.html',
    styleUrls: ['pages/score/score-common.css']
})

export class ScoreComponent implements AfterViewInit {

    @Input() score;
    @Output() currentPage = new EventEmitter<ProfilePage>();

    constructor() {

    }

    ngAfterViewInit() {
        this.currentPage.emit(ProfilePage.Experience);
    }
}