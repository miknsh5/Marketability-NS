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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraWxscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFXekQsSUFBYSxlQUFlO0lBTXhCO1FBTFMseUJBQW9CLEdBQWlCLEtBQUssRUFBUyxDQUFDO0lBTzdELENBQUM7SUFMRCxrQ0FBUSxHQUFSO1FBQ0ksc0NBQXNDO0lBQzFDLENBQUM7SUFJTCxzQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBUlk7SUFBUixZQUFLLEVBQUU7OEJBQXVCLEtBQUs7NkRBQXlCO0FBRHBELGVBQWU7SUFOM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDaEQsQ0FBQzs7R0FFVyxlQUFlLENBUzNCO0FBVFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyBTa2lsbCwgUHJvZmlsZVBhZ2UgfSBmcm9tICcuLi8uLi8uLi9hcHAvc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2Itc2tpbGxzJyxcclxuICAgIHRlbXBsYXRlVXJsOiAncGFnZXMvc2tpbGxzL3NraWxscy5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWydwYWdlcy9za2lsbHMvc2tpbGxzLWNvbW1vbi5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNraWxsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBDdXJyZW50UHJvZmlsZVNraWxsczogQXJyYXk8U2tpbGw+ID0gQXJyYXk8U2tpbGw+KCk7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy8gICBhbGVydCh0aGlzLkN1cnJlbnRQcm9maWxlU2tpbGxzKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=