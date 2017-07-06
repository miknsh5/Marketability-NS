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
        //   alert(this.CurrentProfileSkills);
    };
    SkillsComponent.prototype.ngAfterViewInit = function () {
        this.currentPage.emit(shared_1.ProfilePage.Skill);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEY7QUFHOUYsOENBQXlEO0FBUXpELElBQWEsZUFBZTtJQU14QjtRQUxTLHlCQUFvQixHQUFpQixLQUFLLEVBQVMsQ0FBQztRQUNuRCxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBTXhELENBQUM7SUFMRCxrQ0FBUSxHQUFSO1FBQ0ksc0NBQXNDO0lBQzFDLENBQUM7SUFJRCx5Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVhZO0lBQVIsWUFBSyxFQUFFOzhCQUF1QixLQUFLOzZEQUF5QjtBQUNuRDtJQUFULGFBQU0sRUFBRTs7b0RBQStDO0FBRi9DLGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDaEQsQ0FBQzs7R0FFVyxlQUFlLENBWTNCO0FBWlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcclxuaW1wb3J0IHsgU2tpbGwsIFByb2ZpbGVQYWdlIH0gZnJvbSAnLi4vLi4vLi4vYXBwL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXNraWxscycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3NraWxscy9za2lsbHMuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsncGFnZXMvc2tpbGxzL3NraWxscy1jb21tb24uY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTa2lsbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgQElucHV0KCkgQ3VycmVudFByb2ZpbGVTa2lsbHM6IEFycmF5PFNraWxsPiA9IEFycmF5PFNraWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGN1cnJlbnRQYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxQcm9maWxlUGFnZT4oKTtcclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vICAgYWxlcnQodGhpcy5DdXJyZW50UHJvZmlsZVNraWxscyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZS5lbWl0KFByb2ZpbGVQYWdlLlNraWxsKTtcclxuICAgIH1cclxufVxyXG4iXX0=