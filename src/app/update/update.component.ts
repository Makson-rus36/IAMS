import {Component, OnInit} from '@angular/core';
import {EventData, Page, TextField} from '@nativescript/core';
import {Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';


@Component({
    selector: 'app-updState',
    templateUrl: './update.component.html',
    styleUrls:['./update.component.css']
})

export class UpdateComponent implements OnInit{
    pulse: number=0;
    pressureHigh: number=0;
    pressureLow: number=0;
    weight: number=0;

    constructor(private page:Page, private router:Router, private profileService:ProfileService) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    goToHome($event){
        this.router.navigate(['home']);
    }

    editPressureHigh(args: EventData){
        this.pressureHigh = Number((<TextField>args.object).text);
    }
    editPressureLow(args: EventData){
        this.pressureLow = Number((<TextField>args.object).text);
    }
    editPulse(args: EventData){
        this.pulse = Number((<TextField>args.object).text);
    }

    editWeight(args: EventData){
        this.weight = Number((<TextField>args.object).text);
    }

    onSave($event){
        let optionsAlert1 = {
            title: "Введите корректные значения",
            message: "Введены некорректные значения",
            okButtonText: "OK"
        };
        if(this.weight>10&&this.pressureHigh>this.pressureLow&&this.pressureHigh>30&&this.pressureLow>20&&this.pulse>30){
            this.profileService.sendInfoHealth(String(this.weight), String(this.pulse), this.pressureHigh+"/"+this.pressureLow, this.router);
        }else {
            alert(optionsAlert1)
        }
    }

    onCancel($event){
        this.router.navigate(['home']);
    }


}
