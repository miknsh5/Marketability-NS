"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SkillsComponent = (function () {
    function SkillsComponent() {
        this.CurrentProfileSkills = Array();
    }
    SkillsComponent.prototype.ngOnInit = function () {
        //   alert(this.CurrentProfileSkills);
    };
    return SkillsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SkillsComponent.prototype, "CurrentProfileSkills", void 0);
SkillsComponent = __decorate([
    core_1.Component({
        selector: 'mkb-skills',
        templateUrl: 'pages/skills/skills.html',
        styleUrls: ['pages/skills/skills-common.css']
    }),
    __metadata("design:paramtypes", [])
], SkillsComponent);
exports.SkillsComponent = SkillsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFXekQsSUFBYSxlQUFlO0lBTXhCO1FBTFMseUJBQW9CLEdBQWlCLEtBQUssRUFBUyxDQUFDO0lBTzdELENBQUM7SUFMRCxrQ0FBUSxHQUFSO1FBQ0ksc0NBQXNDO0lBQzFDLENBQUM7SUFJTCxzQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBUlk7SUFBUixZQUFLLEVBQUU7OEJBQXVCLEtBQUs7NkRBQXlCO0FBRHBELGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDaEQsQ0FBQzs7R0FFVyxlQUFlLENBUzNCO0FBVFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBTa2lsbCwgUHJvZmlsZVBhZ2UgfSBmcm9tICcuLi8uLi8uLi9hcHAvc2hhcmVkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdta2Itc2tpbGxzJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL3NraWxscy9za2lsbHMuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3BhZ2VzL3NraWxscy9za2lsbHMtY29tbW9uLmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgU2tpbGxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBDdXJyZW50UHJvZmlsZVNraWxsczogQXJyYXk8U2tpbGw+ID0gQXJyYXk8U2tpbGw+KCk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gICBhbGVydCh0aGlzLkN1cnJlbnRQcm9maWxlU2tpbGxzKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG59XG4iXX0=