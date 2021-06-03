import {Component, OnInit} from '@angular/core';
import {EventData, Page, TextField} from '@nativescript/core';
import {Router} from '@angular/router';
import {AuthModel} from '@src/app/models/auth.model';
import {ErrorModel} from '@src/app/models/error.model';
import {AuthService} from '@src/app/services/auth.service';

@Component({
    selector: 'app-acc',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit{
    isEdit:boolean = false;
    userLogin: string='';
    userOldPassword:string = '';
    userNewPassword:string = '';
    userNewPasswordConfirm:string = '';
    constructor(private page: Page, private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        const appSettings = require("tns-core-modules/application-settings");
        this.userLogin = appSettings.getString("acc_email")
        this.page.actionBarHidden = true;
    }

    onExit($event){
        const appSettings = require("tns-core-modules/application-settings");
        appSettings.setString("token", "");
        appSettings.setString("id_acc", "");
        appSettings.setString("id_user", "");
        this.router.navigate(['enter'])
    }
    goToSettings($event){
        this.router.navigate(['settings']);
    }
    onEdit($event){
        this.isEdit = true;
    }
    onSave($event){
        let optionsAlert1 = {
            title: "Заполните поля.",
            message: "Необходимо заполнить все поля",
            okButtonText: "OK"
        };
        let optionsAlert2 = {
            title: "Пароли не совпадают.",
            message: "Пароли не совпадают.",
            okButtonText: "OK"
        };
        let optionsAlert3 = {
            title: "Пароль не надежный.",
            message: "Должно быть не менее 8 символов в поле новый пароль!",
            okButtonText: "OK"
        };
        let optionsAlert4 = {
            title: "Старый пароль не верный.",
            message: "Укажите текущий пароль верно!",
            okButtonText: "OK"
        };
        const appSettings = require("tns-core-modules/application-settings");
        if(this.userNewPassword==''&& this.userNewPasswordConfirm=='' && this.userOldPassword=='')
            alert(optionsAlert1);
        else{
            if(this.userNewPassword!=this.userNewPasswordConfirm)
                alert(optionsAlert2);
            else {
                if(this.userNewPassword.length<8)
                    alert(optionsAlert3)
                else {
                    if(appSettings.getString("psw_user")==this.userOldPassword){
                        this.authService.updPassword(this.userNewPassword).subscribe((x)=>{
                            this.onExit(null)
                        }, (error:ErrorModel) => {
                            console.log(error)
                        });
                    }else {
                        alert(optionsAlert4)
                    }
                }
            }
        }
    }
    onCancel($event){
        this.isEdit=false;
    }
    editLoginChng(args: EventData){
        this.userLogin = (<TextField>args.object).text;
    }

    editNewPswChng(args: EventData){
        this.userNewPassword = (<TextField>args.object).text;
    }
    editConfPswChng(args: EventData){
        this.userNewPasswordConfirm = (<TextField>args.object).text;
    }

    editOldPswChng(args: EventData){
        this.userOldPassword = (<TextField>args.object).text;
    }
}
