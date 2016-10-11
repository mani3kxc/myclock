"use strict";
var core_1 = require("@angular/core");
var timer_service_1 = require("./timer.service");
var page_1 = require("ui/page");
var application = require("application");
var sound = require("nativescript-sound");
var AppComponent = (function () {
    function AppComponent(timerservice, page) {
        var _this = this;
        this.timerservice = timerservice;
        this.page = page;
        this.isOn = false;
        application.on(application.suspendEvent, function () {
            console.log("SUSPEND");
            clearInterval(_this.id);
        });
        application.on(application.resumeEvent, function () {
            console.log("WAKE UP");
        });
        this.music = sound.create("~/music.mp3");
    }
    AppComponent.prototype.start = function () {
        var _this = this;
        var datePickerView = this.timePicker.nativeElement;
        var month;
        var day;
        month = (new Date).getMonth() + 1;
        day = (new Date).getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        this.target = new Date().setHours(datePickerView.hour, datePickerView.minute, 0);
        this.timerservice.begin();
        clearInterval(this.id);
        this.id = setInterval(function () {
            //console.log(this.timer);
            _this.timer = _this.target - _this.timerservice.gettime();
            _this.convert();
            if (_this.timer <= 0)
                clearInterval(_this.id);
            _this.music.play();
        }, 1);
        this.isOn = true;
    };
    AppComponent.prototype.time_set = function () {
    };
    AppComponent.prototype.convert = function () {
        var hours;
        var minutes;
        var seconds;
        var millis;
        hours = Math.floor((this.timer / 1000) / 3600);
        minutes = Math.floor((this.timer / 1000) / 60) - hours * 60;
        seconds = Math.floor((this.timer / 1000)) - hours * 3600 - minutes * 60;
        millis = this.timer - hours * 3600 * 1000 - minutes * 60 * 1000 - seconds * 1000;
        if (hours < 10)
            hours = "0" + hours;
        if (minutes < 10)
            minutes = "0" + minutes;
        if (seconds < 10)
            seconds = "0" + seconds;
        if (millis < 100)
            millis = "0" + millis;
        if (millis < 10)
            millis = "00" + millis;
        this.czas = hours + ":" + minutes + ":" + seconds + "." + millis;
    };
    AppComponent.prototype.stop = function () {
        console.log("STOP");
        clearInterval(this.id);
        this.isOn = false;
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.toggle = function () {
        if (this.isOn) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.stop();
        console.log("APP FINISH");
    };
    __decorate([
        core_1.ViewChild("Picker"), 
        __metadata('design:type', core_1.ElementRef)
    ], AppComponent.prototype, "timePicker", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            providers: [timer_service_1.TimerService],
            templateUrl: "app.component.html",
        }), 
        __metadata('design:paramtypes', [timer_service_1.TimerService, page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map