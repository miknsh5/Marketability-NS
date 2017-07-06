"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var ExperienceComponent = (function () {
    function ExperienceComponent() {
        this.currentPage = new core_1.EventEmitter();
    }
    ExperienceComponent.prototype.ngAfterViewInit = function () {
        this.currentPage.emit(index_1.ProfilePage.Experience);
    };
    return ExperienceComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", index_1.Experience)
], ExperienceComponent.prototype, "CurrentProfileExperience", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ExperienceComponent.prototype, "currentPage", void 0);
ExperienceComponent = __decorate([
    core_1.Component({
        selector: 'mkb-experience',
        templateUrl: 'pages/experience/experience.html',
        styleUrls: ['pages/experience/experience-common.css']
    }),
    __metadata("design:paramtypes", [])
], ExperienceComponent);
exports.ExperienceComponent = ExperienceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJpZW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBlcmllbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtSDtBQUduSCw0Q0FBNkQ7QUFRN0QsSUFBYSxtQkFBbUI7SUFLOUI7UUFGVSxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBZSxDQUFDO0lBSXhELENBQUM7SUFDRCw2Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVRVO0lBQVIsWUFBSyxFQUFFOzhCQUEyQixrQkFBVTtxRUFBQztBQUNwQztJQUFULGFBQU0sRUFBRTs7d0RBQStDO0FBSDdDLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLFNBQVMsRUFBRSxDQUFDLHdDQUF3QyxDQUFDO0tBQ3hELENBQUM7O0dBRVcsbUJBQW1CLENBVy9CO0FBWFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBFeHBlcmllbmNlLCBQcm9maWxlUGFnZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbmRleCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbWtiLWV4cGVyaWVuY2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9leHBlcmllbmNlL2V4cGVyaWVuY2UuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsncGFnZXMvZXhwZXJpZW5jZS9leHBlcmllbmNlLWNvbW1vbi5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEV4cGVyaWVuY2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgQElucHV0KCkgQ3VycmVudFByb2ZpbGVFeHBlcmllbmNlOiBFeHBlcmllbmNlO1xyXG4gIEBPdXRwdXQoKSBjdXJyZW50UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZmlsZVBhZ2U+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICB9XHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZS5lbWl0KFByb2ZpbGVQYWdlLkV4cGVyaWVuY2UpO1xyXG4gIH1cclxufSJdfQ==