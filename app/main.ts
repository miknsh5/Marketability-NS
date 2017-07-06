import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import * as tnsOAuthModule from 'nativescript-oauth';
var linkedInInitOptions : tnsOAuthModule.ITnsOAuthOptionsLinkedIn = {
    clientId: '81gzlapbgbfu0s',
    clientSecret: 'mzepMVenjiuHA21S',
    scope: ['r_basicprofile'], //Leave blank and the default scopes will be used,
    redirectUri:'http://cennest.com' 
};

tnsOAuthModule.initLinkedIn(linkedInInitOptions);
platformNativeScriptDynamic().bootstrapModule(AppModule);
