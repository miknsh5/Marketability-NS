import { LoginComponent } from "./pages/login/login.component";
import { BasicProfileComponent } from "./pages/basicprofile/basic-profile.component";
import { ProfileManagerComponent } from "./pages/profilemanager.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { CalculationComponent } from "./pages/calculation/calculation.component";
import { ExperienceComponent } from "./pages/experience/experience.component";
import { ScoreComponent } from "./pages/score/score.component";

export const routes = [
  { path: "", component: LoginComponent },
  {
    path: "manager", component: ProfileManagerComponent, children: [
      { path: "basicprofile/:profile", component: BasicProfileComponent, outlet: 'profileManagerOutlet' },
      { path: "skills/:skills", component: SkillsComponent, outlet: 'profileManagerOutlet' },
      { path: "calculation/:experience", component: CalculationComponent, outlet: 'profileManagerOutlet' },
      { path: "experience/:currentProfile", component: ExperienceComponent, outlet: 'profileManagerOutlet' },
      { path: "score/:score", component: ScoreComponent, outlet: 'profileManagerOutlet' },
    ]
  },



];

export const navigatableComponents = [
  LoginComponent,
  BasicProfileComponent,
  ProfileManagerComponent,
  SkillsComponent,
  CalculationComponent,
  ExperienceComponent,
  ScoreComponent

];