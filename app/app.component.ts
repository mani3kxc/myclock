import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from "@angular/core";
import {TimePicker} from "ui/time-picker"

import {TimerService} from "./timer.service";
import {Page} from "ui/page";

var application = require("application");
var sound = require("nativescript-sound");


@Component({
    selector: "my-app",
    providers: [ TimerService ],
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
    public timer;
    public isOn: boolean = false;
    public czas: string;

    public time: any;
    public music: any;

    id: any;
    target: number;

    @ViewChild("Picker") timePicker: ElementRef;
    

    constructor(private timerservice: TimerService, private page: Page){

          application.on(application.suspendEvent, () => {
            console.log("SUSPEND");
            clearInterval(this.id);
          });

          application.on(application.resumeEvent, () => {
            console.log("WAKE UP");
          });

         this.music = sound.create("~/music.mp3");

    }

    start()
    {
        let datePickerView = <TimePicker>this.timePicker.nativeElement;
        
        let month;
        let day;

        month = (new Date).getMonth()+1;
        day = (new Date).getDate();

        if(month<10)
            month="0"+month;
        if(day<10)
            day="0"+day;
        
        this.target=new Date().setHours(datePickerView.hour, datePickerView.minute, 0);


        this.timerservice.begin();
        clearInterval(this.id);
        this.id=setInterval(
           () => {

               //console.log(this.timer);
               this.timer=this.target-this.timerservice.gettime();
               this.convert();
               
                if(this.timer<=0)
                   clearInterval(this.id);

                   this.music.play();

                }, 
                1);
            
            
            this.isOn = true;
    }

    time_set() {



    }

    convert()
    {
        let hours;
        let minutes;
        let seconds;
        let millis;

        hours=Math.floor((this.timer/1000)/3600);
        minutes=Math.floor((this.timer/1000)/60)-hours*60;
        seconds=Math.floor((this.timer/1000))-hours*3600-minutes*60;
        millis=this.timer-hours*3600*1000-minutes*60*1000-seconds*1000;

        if(hours<10)
            hours="0"+hours;
        if(minutes<10)
            minutes="0"+minutes;
        if(seconds<10)
            seconds="0"+seconds;
        if(millis<100)
            millis="0"+millis;
        if(millis<10)
            millis="00"+millis;


        this.czas=hours+":"+ minutes+":"+ seconds+"."+ millis;

    }


    stop()
    {
        console.log("STOP");
        clearInterval(this.id);
            this.isOn = false;
    }

    ngOnInit(){
        
    }

    toggle()
    {
        if(this.isOn)
        {
            this.stop();
        }
        else
        {
            this.start();
        }

    }

    ngOnDestroy() {
        this.stop();
        console.log("APP FINISH");
    }
    
}
