"use strict";
var core_1 = require('@angular/core');
var TimerService = (function () {
    function TimerService() {
        this.zerotime = 0;
    }
    TimerService.prototype.begin = function () {
        this.zerotime = (new Date()).getTime();
    };
    TimerService.prototype.gettime = function () {
        return (new Date()).getTime();
    };
    TimerService.prototype.gettimefromnow = function () {
        if (this.zerotime)
            return (new Date()).getTime() - this.zerotime;
        else
            return 0;
    };
    TimerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TimerService);
    return TimerService;
}());
exports.TimerService = TimerService;
//# sourceMappingURL=timer.service.js.map