import { LoginComponent } from "./pages/login/login.component";
import { BasicProfileComponent} from "./pages/basicprofile/basic-profile.component";
import {ProfileManagerComponent} from "./pages/profilemanager.component";
import{SkillsComponent} from "./pages/skills/skills.component";
export const routes = [
  { path: "", component: LoginComponent },
  { path:"basicprofile",component:BasicProfileComponent},
  {path:"manager", component:ProfileManagerComponent},
  {path:"skills",component:SkillsComponent}

  
];

export const navigatableComponents = [
  LoginComponent,
  BasicProfileComponent,
  ProfileManagerComponent,
  SkillsComponent
  
];