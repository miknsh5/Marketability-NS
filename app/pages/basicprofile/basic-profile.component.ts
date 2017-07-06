import { Component, Input,OnInit, AfterViewInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import {Page} from "ui/page";
import {ProfilePage} from '../../shared/index';
@Component({
    selector: 'mkb-basic-profile',
    templateUrl: 'pages/basicprofile/basic-profile.html',
    styleUrls: ["pages/basicprofile/basic-profile-common.css"]
})
export class BasicProfileComponent implements OnInit, AfterViewInit {
  ngOnInit()
 {
 }
    @Input() profile;
    @Output() currentPage = new EventEmitter<ProfilePage>();
    
    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            // $('#occupation_textarea').trigger('autoresize');
            this.currentPage.emit(ProfilePage.Profile);
        }, 0)
    }
}
