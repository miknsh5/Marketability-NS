import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'mkb-score',
    templateUrl: 'pages/score/score.html',
    styleUrls: ['pages/score/score-common.css']
})

export class ScoreComponent {

    score;

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.score = params["score"];
        });
    }
}