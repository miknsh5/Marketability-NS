import { Injectable } from '@angular/core';

import { PersonProfile } from './personProfile.model'

@Injectable()
export class ProfileData {

    public personProfile: PersonProfile;

    public constructor() { }

}