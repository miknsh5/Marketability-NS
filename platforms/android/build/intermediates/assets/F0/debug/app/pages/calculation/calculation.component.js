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
    CalculationComponent.prototype.ngAfterViewInit = function () {
        this.currentPage.emit(index_1.ProfilePage.Computation);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsY3VsYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1IO0FBR25ILDRDQUFzRjtBQVF0RixJQUFhLG9CQUFvQjtJQU03Qiw4QkFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFIcEQsWUFBTyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFlLENBQUM7SUFJeEQsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUpHLFVBQVUsQ0FBQztZQUNQLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN4RixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsOENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQW5CWTtJQUFSLFlBQUssRUFBRTs4QkFBdUIscUJBQWE7a0VBQUM7QUFDbkM7SUFBVCxhQUFNLEVBQUU7O3FEQUFzQztBQUNyQztJQUFULGFBQU0sRUFBRTs7eURBQStDO0FBSi9DLG9CQUFvQjtJQU5oQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsb0NBQW9DO1FBQ2pELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO0tBQzFELENBQUM7cUNBUTRDLDRCQUFvQjtHQU5yRCxvQkFBb0IsQ0FxQmhDO0FBckJZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgUGVyc29uUHJvZmlsZSwgTWFya2V0YWJpbGl0eVNlcnZpY2UsIFByb2ZpbGVQYWdlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2luZGV4JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdta2ItY2FsY3VsYXRpb24nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYWdlcy9jYWxjdWxhdGlvbi9jYWxjdWxhdGlvbi5odG1sJyxcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvY2FsY3VsYXRpb24vY2FsY3VsYXRpb24tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbGN1bGF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBDdXJyZW50UGVyc29uUHJvZmlsZTogUGVyc29uUHJvZmlsZTtcclxuICAgIEBPdXRwdXQoKSBvbnNjb3JlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgY3VycmVudFBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFByb2ZpbGVQYWdlPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFya2V0YWJpbGl0eVNlcnZpY2U6IE1hcmtldGFiaWxpdHlTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5tYXJrZXRhYmlsaXR5U2VydmljZS5jYWxjdWxhdGVNYXJrZXRhYmlsaXR5KHRoaXMuQ3VycmVudFBlcnNvblByb2ZpbGUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uc2NvcmUuZW1pdChzY29yZSk7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlLmVtaXQoUHJvZmlsZVBhZ2UuQ29tcHV0YXRpb24pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==