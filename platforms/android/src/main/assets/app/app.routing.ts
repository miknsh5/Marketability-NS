import { LoginComponent } from "./pages/login/login.component";
import { BasicProfileComponent } from "./pages/basicprofile/basic-profile.component";
import { ProfileManagerComponent } from "./pages/profilemanager.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { CalculationComponent } from "./pages/calculation/calculation.component";
import { ExperienceComponent } from "./pages/experience/experience.component";
import { ScoreComponent } from "./pages/score/score.component";
//import { LoadingComponent } from "./pages/loading/loading.component";

export const routes = [
  { path: "", component: LoginComponent },
  {
    path: "home", component: ProfileManagerComponent, children: [
     // { path: "", component: LoadingComponent, outlet: 'profileManagerOutlet' },
      { path: "basicprofile", component: BasicProfileComponent },
      { path: "skills", component: SkillsComponent },
      { path: "calculation", component: CalculationComponent },
      { path: "experience", component: ExperienceComponent },
      { path: "score", component: ScoreComponent},
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
  //LoadingComponent
];