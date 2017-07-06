"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var BasicProfileComponent = (function () {
    function BasicProfileComponent() {
        this.currentPage = new core_1.EventEmitter();
    }
    BasicProfileComponent.prototype.ngOnInit = function () {
    };
    BasicProfileComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            // $('#occupation_textarea').trigger('autoresize');
            _this.currentPage.emit(index_1.ProfilePage.Profile);
        }, 0);
    };
    return BasicProfileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BasicProfileComponent.prototype, "profile", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BasicProfileComponent.prototype, "currentPage", void 0);
BasicProfileComponent = __decorate([
    core_1.Component({
        selector: 'mkb-basic-profile',
        templateUrl: 'pages/basicprofile/basic-profile.html',
        styleUrls: ["pages/basicprofile/basic-profile-common.css"]
    }),
    __metadata("design:paramtypes", [])
], BasicProfileComponent);
exports.BasicProfileComponent = BasicProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNpYy1wcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrSDtBQUdsSCw0Q0FBK0M7QUFNL0MsSUFBYSxxQkFBcUI7SUFPOUI7UUFGVSxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBR3hELENBQUM7SUFQSCx3Q0FBUSxHQUFSO0lBRUQsQ0FBQztJQU9FLCtDQUFlLEdBQWY7UUFBQSxpQkFLQztRQUpHLFVBQVUsQ0FBQztZQUNQLG1EQUFtRDtZQUNuRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNULENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFaWTtJQUFSLFlBQUssRUFBRTs7c0RBQVM7QUFDUDtJQUFULGFBQU0sRUFBRTs7MERBQStDO0FBTC9DLHFCQUFxQjtJQUxqQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLDZDQUE2QyxDQUFDO0tBQzdELENBQUM7O0dBQ1cscUJBQXFCLENBZ0JqQztBQWhCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7UHJvZmlsZVBhZ2V9IGZyb20gJy4uLy4uL3NoYXJlZC9pbmRleCc7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItYmFzaWMtcHJvZmlsZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2Jhc2ljcHJvZmlsZS9iYXNpYy1wcm9maWxlLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9iYXNpY3Byb2ZpbGUvYmFzaWMtcHJvZmlsZS1jb21tb24uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNpY1Byb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIG5nT25Jbml0KClcclxuIHtcclxuIH1cclxuICAgIEBJbnB1dCgpIHByb2ZpbGU7XHJcbiAgICBAT3V0cHV0KCkgY3VycmVudFBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2ZpbGVQYWdlPigpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICQoJyNvY2N1cGF0aW9uX3RleHRhcmVhJykudHJpZ2dlcignYXV0b3Jlc2l6ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLmVtaXQoUHJvZmlsZVBhZ2UuUHJvZmlsZSk7XHJcbiAgICAgICAgfSwgMClcclxuICAgIH1cclxufVxyXG4iXX0=