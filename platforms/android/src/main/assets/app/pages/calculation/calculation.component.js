"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var CalculationComponent = (function () {
    function CalculationComponent(marketabilityService) {
        this.marketabilityService = marketabilityService;
        this.onscore = new core_1.EventEmitter();
        this.currentPage = new core_1.EventEmitter();
    }
    CalculationComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            var score = _this.marketabilityService.calculateMarketability(_this.CurrentPersonProfile);
            _this.onscore.emit(score);
        }, 2000);
    };
    return CalculationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", index_1.PersonProfile)
], CalculationComponent.prototype, "CurrentPersonProfile", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CalculationComponent.prototype, "onscore", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CalculationComponent.prototype, "currentPage", void 0);
CalculationComponent = __decorate([
    core_1.Component({
        selector: 'mkb-calculation',
        templateUrl: 'pages/calculation/calculation.html',
        styleUrls: ["pages/calculation/calculation-common.css"]
    }),
    __metadata("design:paramtypes", [index_1.MarketabilityService])
], CalculationComponent);
exports.CalculationComponent = CalculationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsY3VsYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9HO0FBR3BHLDRDQUFzRjtBQVF0RixJQUFhLG9CQUFvQjtJQU03Qiw4QkFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFIcEQsWUFBTyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFlLENBQUM7SUFJeEQsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUpHLFVBQVUsQ0FBQztZQUNQLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4RixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBR0wsMkJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBakJZO0lBQVIsWUFBSyxFQUFFOzhCQUF1QixxQkFBYTtrRUFBQztBQUNuQztJQUFULGFBQU0sRUFBRTs7cURBQXNDO0FBQ3JDO0lBQVQsYUFBTSxFQUFFOzt5REFBK0M7QUFKL0Msb0JBQW9CO0lBTmhDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSxvQ0FBb0M7UUFDakQsU0FBUyxFQUFFLENBQUMsMENBQTBDLENBQUM7S0FDMUQsQ0FBQztxQ0FRNEMsNEJBQW9CO0dBTnJELG9CQUFvQixDQW1CaEM7QUFuQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBQZXJzb25Qcm9maWxlLCBNYXJrZXRhYmlsaXR5U2VydmljZSwgUHJvZmlsZVBhZ2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW5kZXgnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21rYi1jYWxjdWxhdGlvbicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3BhZ2VzL2NhbGN1bGF0aW9uL2NhbGN1bGF0aW9uLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9jYWxjdWxhdGlvbi9jYWxjdWxhdGlvbi1jb21tb24uY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIEN1cnJlbnRQZXJzb25Qcm9maWxlOiBQZXJzb25Qcm9maWxlO1xyXG4gICAgQE91dHB1dCgpIG9uc2NvcmUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBjdXJyZW50UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvZmlsZVBhZ2U+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYXJrZXRhYmlsaXR5U2VydmljZTogTWFya2V0YWJpbGl0eVNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLm1hcmtldGFiaWxpdHlTZXJ2aWNlLmNhbGN1bGF0ZU1hcmtldGFiaWxpdHkodGhpcy5DdXJyZW50UGVyc29uUHJvZmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25zY29yZS5lbWl0KHNjb3JlKTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==