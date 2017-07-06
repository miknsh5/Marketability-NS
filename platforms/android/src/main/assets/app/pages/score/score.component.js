"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var ScoreComponent = (function () {
    function ScoreComponent() {
        this.currentPage = new core_1.EventEmitter();
    }
    ScoreComponent.prototype.ngAfterViewInit = function () {
        this.currentPage.emit(index_1.ProfilePage.Experience);
    };
    return ScoreComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ScoreComponent.prototype, "score", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ScoreComponent.prototype, "currentPage", void 0);
ScoreComponent = __decorate([
    core_1.Component({
        selector: 'mkb-score',
        templateUrl: 'pages/score/score.html',
        styleUrls: ['pages/score/score-common.css']
    }),
    __metadata("design:paramtypes", [])
], ScoreComponent);
exports.ScoreComponent = ScoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NvcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1IO0FBR25ILDRDQUFpRDtBQVFqRCxJQUFhLGNBQWM7SUFLdkI7UUFGVSxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBSXhELENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVZZO0lBQVIsWUFBSyxFQUFFOzs2Q0FBTztBQUNMO0lBQVQsYUFBTSxFQUFFOzttREFBK0M7QUFIL0MsY0FBYztJQU4xQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztLQUM5QyxDQUFDOztHQUVXLGNBQWMsQ0FZMUI7QUFaWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyBQcm9maWxlUGFnZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbmRleCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLXNjb3JlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAncGFnZXMvc2NvcmUvc2NvcmUuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsncGFnZXMvc2NvcmUvc2NvcmUtY29tbW9uLmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2NvcmVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBzY29yZTtcclxuICAgIEBPdXRwdXQoKSBjdXJyZW50UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZmlsZVBhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLmVtaXQoUHJvZmlsZVBhZ2UuRXhwZXJpZW5jZSk7XHJcbiAgICB9XHJcbn0iXX0=