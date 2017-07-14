import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import * as tnsOAuthModule from 'nativescript-oauth';
import { Router, NavigationExtras } from "@angular/router";
import {Observable} from 'rxjs/Rx';
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "application-settings";
@Injectable()
export class ProfileService {
  profileUrl: string = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,location,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token=";
  constructor(private http: Http,private router: Router) { }

  getProfile(token: string) {
   

  return this.http.get(this.profileUrl + token + "&format=json").map(result => result.json()).catch((error: any) => {
                if (error.status !== 200) {
                 remove("accesstoken");
                 remove("personProfile");
                  alert(error.status)
                  this.router.navigate([""]);
                    return Observable.throw(new Error(error.status));
                }});

  }
}