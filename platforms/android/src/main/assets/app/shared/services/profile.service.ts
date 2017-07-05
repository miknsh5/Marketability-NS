import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
@Injectable()
export class ProfileService {
constructor(private http: Http) {}
getProfile(token: string )
{
    alert("token rec by service is "+token);
let headers = new Headers();
    headers.append("Content-Type", "application/json");
return this.http.get("https://api.linkedin.com/v1/people/~?oauth2_access_token="+token+"&format=json").map(result=>result.json());

}
}
