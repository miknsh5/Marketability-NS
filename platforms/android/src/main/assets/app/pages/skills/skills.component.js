"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../../../app/shared");
var SkillsComponent = (function () {
    function SkillsComponent() {
        this.CurrentProfileSkills = Array();
        this.currentPage = new core_1.EventEmitter();
    }
    SkillsComponent.prototype.ngOnInit = function () {
<<<<<<< HEAD
        //   alert(this.CurrentProfileSkills);
    };
    SkillsComponent.prototype.ngAfterViewInit = function () {
        this.currentPage.emit(shared_1.ProfilePage.Skill);
=======
        // alert("Skills");
>>>>>>> task/linkedInIntegration
    };
    return SkillsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SkillsComponent.prototype, "CurrentProfileSkills", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SkillsComponent.prototype, "currentPage", void 0);
SkillsComponent = __decorate([
    core_1.Component({
        selector: 'mkb-skills',
        templateUrl: 'pages/skills/skills.html',
        styleUrls: ['pages/skills/skills-common.css']
    }),
    __metadata("design:paramtypes", [])
], SkillsComponent);
exports.SkillsComponent = SkillsComponent;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEY7QUFHOUYsOENBQXlEO0FBT3pELElBQWEsZUFBZTtJQU94QjtRQU5TLHlCQUFvQixHQUFpQixLQUFLLEVBQVMsQ0FBQztRQUNuRCxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBT3hELENBQUM7SUFORCxrQ0FBUSxHQUFSO1FBQ0ksc0NBQXNDO0lBQzFDLENBQUM7SUFLRCx5Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQVpZO0lBQVIsWUFBSyxFQUFFOzhCQUF1QixLQUFLOzZEQUF5QjtBQUNuRDtJQUFULGFBQU0sRUFBRTs7b0RBQStDO0FBRi9DLGVBQWU7SUFMM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDaEQsQ0FBQzs7R0FDVyxlQUFlLENBYTNCO0FBYlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcclxuaW1wb3J0IHsgU2tpbGwsIFByb2ZpbGVQYWdlIH0gZnJvbSAnLi4vLi4vLi4vYXBwL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXNraWxscycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3NraWxscy9za2lsbHMuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsncGFnZXMvc2tpbGxzL3NraWxscy1jb21tb24uY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNraWxsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBASW5wdXQoKSBDdXJyZW50UHJvZmlsZVNraWxsczogQXJyYXk8U2tpbGw+ID0gQXJyYXk8U2tpbGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgY3VycmVudFBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2ZpbGVQYWdlPigpO1xyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gICBhbGVydCh0aGlzLkN1cnJlbnRQcm9maWxlU2tpbGxzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZS5lbWl0KFByb2ZpbGVQYWdlLlNraWxsKTtcclxuICAgIH1cclxufVxyXG4iXX0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0Q7QUFTeEQsSUFBYSxlQUFlO0lBT3hCO1FBTk0seUJBQW9CLEdBQWlCLEtBQUssRUFBUyxDQUFDO0lBUTFELENBQUM7SUFQSCxrQ0FBUSxHQUFSO1FBRUQsbUJBQW1CO0lBQ25CLENBQUM7SUFLRixzQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVFM7SUFBUixZQUFLLEVBQUU7OEJBQXVCLEtBQUs7NkRBQXlCO0FBRGpELGVBQWU7SUFMM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDaEQsQ0FBQzs7R0FDVyxlQUFlLENBVTNCO0FBVlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU2tpbGwgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NoYXJlZFwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXNraWxscycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3NraWxscy9za2lsbHMuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3NraWxscy9za2lsbHMtY29tbW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2tpbGxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gQElucHV0KCkgQ3VycmVudFByb2ZpbGVTa2lsbHM6IEFycmF5PFNraWxsPiA9IEFycmF5PFNraWxsPigpO1xyXG4gIG5nT25Jbml0KClcclxuIHtcclxuIC8vIGFsZXJ0KFwiU2tpbGxzXCIpO1xyXG4gfVxyXG4gICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICBcclxuICAgIH1cclxufVxyXG4iXX0=
>>>>>>> task/linkedInIntegration
