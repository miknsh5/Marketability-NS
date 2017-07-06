"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var BasicProfileComponent = (function () {
    function BasicProfileComponent() {
        this.currentPage = new core_1.EventEmitter();
    }
    BasicProfileComponent.prototype.ngOnInit = function () {
        //   alert("basic profile");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNpYy1wcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrSDtBQUdsSCw0Q0FBK0M7QUFNL0MsSUFBYSxxQkFBcUI7SUFROUI7UUFGVSxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBR3hELENBQUM7SUFSSCx3Q0FBUSxHQUFSO1FBRUYsNEJBQTRCO0lBQzNCLENBQUM7SUFPRSwrQ0FBZSxHQUFmO1FBQUEsaUJBS0M7UUFKRyxVQUFVLENBQUM7WUFDUCxtREFBbUQ7WUFDbkQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBWlk7SUFBUixZQUFLLEVBQUU7O3NEQUFTO0FBQ1A7SUFBVCxhQUFNLEVBQUU7OzBEQUErQztBQU4vQyxxQkFBcUI7SUFMakMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztLQUM3RCxDQUFDOztHQUNXLHFCQUFxQixDQWlCakM7QUFqQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCxPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQge1Byb2ZpbGVQYWdlfSBmcm9tICcuLi8uLi9zaGFyZWQvaW5kZXgnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLWJhc2ljLXByb2ZpbGUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9iYXNpY3Byb2ZpbGUvYmFzaWMtcHJvZmlsZS5odG1sJyxcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvYmFzaWNwcm9maWxlL2Jhc2ljLXByb2ZpbGUtY29tbW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzaWNQcm9maWxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBuZ09uSW5pdCgpXHJcbiB7XHJcbi8vICAgYWxlcnQoXCJiYXNpYyBwcm9maWxlXCIpO1xyXG4gfVxyXG4gICAgQElucHV0KCkgcHJvZmlsZTtcclxuICAgIEBPdXRwdXQoKSBjdXJyZW50UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZmlsZVBhZ2U+KCk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gJCgnI29jY3VwYXRpb25fdGV4dGFyZWEnKS50cmlnZ2VyKCdhdXRvcmVzaXplJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UuZW1pdChQcm9maWxlUGFnZS5Qcm9maWxlKTtcclxuICAgICAgICB9LCAwKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==