import { Component, Input,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Page} from "ui/page";
@Component({
    selector: 'mkb-basic-profile',
    templateUrl: 'pages/basicprofile/basic-profile.html',
    styleUrls: ["pages/basicprofile/basic-profile-common.css"]
})
export class BasicProfileComponent implements OnInit{
  ngOnInit()
 {
  alert("basic profile");
 }
    @Input() profile;
    constructor() {
   
    }
}
