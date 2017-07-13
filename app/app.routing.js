"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var basic_profile_component_1 = require("./pages/basicprofile/basic-profile.component");
var profilemanager_component_1 = require("./pages/profilemanager.component");
var skills_component_1 = require("./pages/skills/skills.component");
var calculation_component_1 = require("./pages/calculation/calculation.component");
var experience_component_1 = require("./pages/experience/experience.component");
var score_component_1 = require("./pages/score/score.component");
//import { LoadingComponent } from "./pages/loading/loading.component";
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    {
        path: "home", component: profilemanager_component_1.ProfileManagerComponent, children: [
            // { path: "", component: LoadingComponent, outlet: 'profileManagerOutlet' },
            { path: "basicprofile", component: basic_profile_component_1.BasicProfileComponent },
            { path: "skills", component: skills_component_1.SkillsComponent },
            { path: "calculation", component: calculation_component_1.CalculationComponent },
            { path: "experience", component: experience_component_1.ExperienceComponent },
            { path: "score", component: score_component_1.ScoreComponent },
        ]
    },
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    basic_profile_component_1.BasicProfileComponent,
    profilemanager_component_1.ProfileManagerComponent,
    skills_component_1.SkillsComponent,
    calculation_component_1.CalculationComponent,
    experience_component_1.ExperienceComponent,
    score_component_1.ScoreComponent
    //LoadingComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUErRDtBQUMvRCx3RkFBcUY7QUFDckYsNkVBQTJFO0FBQzNFLG9FQUFrRTtBQUNsRSxtRkFBaUY7QUFDakYsZ0ZBQThFO0FBQzlFLGlFQUErRDtBQUMvRCx1RUFBdUU7QUFFMUQsUUFBQSxNQUFNLEdBQUc7SUFDcEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQ3ZDO1FBQ0UsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsa0RBQXVCLEVBQUUsUUFBUSxFQUFFO1lBQzNELDZFQUE2RTtZQUM1RSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFFO1lBQzFELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRTtZQUM5QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDRDQUFvQixFQUFFO1lBQ3hELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsMENBQW1CLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFDO1NBQzVDO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRztJQUNuQyxnQ0FBYztJQUNkLCtDQUFxQjtJQUNyQixrREFBdUI7SUFDdkIsa0NBQWU7SUFDZiw0Q0FBb0I7SUFDcEIsMENBQW1CO0lBQ25CLGdDQUFjO0lBQ2Qsa0JBQWtCO0NBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBCYXNpY1Byb2ZpbGVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9iYXNpY3Byb2ZpbGUvYmFzaWMtcHJvZmlsZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvZmlsZU1hbmFnZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9wcm9maWxlbWFuYWdlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2tpbGxzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvc2tpbGxzL3NraWxscy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2FsY3VsYXRpb25Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9jYWxjdWxhdGlvbi9jYWxjdWxhdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXhwZXJpZW5jZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2V4cGVyaWVuY2UvZXhwZXJpZW5jZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2NvcmVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9zY29yZS9zY29yZS5jb21wb25lbnRcIjtcclxuLy9pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcclxuICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcclxuICB7XHJcbiAgICBwYXRoOiBcImhvbWVcIiwgY29tcG9uZW50OiBQcm9maWxlTWFuYWdlckNvbXBvbmVudCwgY2hpbGRyZW46IFtcclxuICAgICAvLyB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogTG9hZGluZ0NvbXBvbmVudCwgb3V0bGV0OiAncHJvZmlsZU1hbmFnZXJPdXRsZXQnIH0sXHJcbiAgICAgIHsgcGF0aDogXCJiYXNpY3Byb2ZpbGVcIiwgY29tcG9uZW50OiBCYXNpY1Byb2ZpbGVDb21wb25lbnQgfSxcclxuICAgICAgeyBwYXRoOiBcInNraWxsc1wiLCBjb21wb25lbnQ6IFNraWxsc0NvbXBvbmVudCB9LFxyXG4gICAgICB7IHBhdGg6IFwiY2FsY3VsYXRpb25cIiwgY29tcG9uZW50OiBDYWxjdWxhdGlvbkNvbXBvbmVudCB9LFxyXG4gICAgICB7IHBhdGg6IFwiZXhwZXJpZW5jZVwiLCBjb21wb25lbnQ6IEV4cGVyaWVuY2VDb21wb25lbnQgfSxcclxuICAgICAgeyBwYXRoOiBcInNjb3JlXCIsIGNvbXBvbmVudDogU2NvcmVDb21wb25lbnR9LFxyXG4gICAgXVxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xyXG4gIExvZ2luQ29tcG9uZW50LFxyXG4gIEJhc2ljUHJvZmlsZUNvbXBvbmVudCxcclxuICBQcm9maWxlTWFuYWdlckNvbXBvbmVudCxcclxuICBTa2lsbHNDb21wb25lbnQsXHJcbiAgQ2FsY3VsYXRpb25Db21wb25lbnQsXHJcbiAgRXhwZXJpZW5jZUNvbXBvbmVudCxcclxuICBTY29yZUNvbXBvbmVudFxyXG4gIC8vTG9hZGluZ0NvbXBvbmVudFxyXG5dOyJdfQ==