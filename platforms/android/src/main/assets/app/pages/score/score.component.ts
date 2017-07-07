import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { ProfilePage } from '../../shared/index';

@Component({
    selector: 'mkb-score',
    templateUrl: 'pages/score/score.html',
    styleUrls: ['pages/score/score-common.css']
})

export class ScoreComponent {

    @Input() score;

    constructor() {

    }
}