import { Component, OnInit } from '@angular/core';
import {EventData, Page, TextView} from '@nativescript/core';
import {Router} from '@angular/router';
import {AuthService} from '@src/app/services/auth.service';
import {ErrorModel} from '@src/app/models/error.model';
import {AuthModel} from '@src/app/models/auth.model';

@Component({
    selector: 'app-enter',
    templateUrl: './enter.component.html',
    styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
    optionsAlert1 = {
        title: "Ошибка сервера.",
        message: "Ошибка сервера. Повторите попытку позднее.",
        okButtonText: "OK"
    };
    optionsAlert2 = {
        title: "Ошибка авторизации.",
        message: "Введеный логин или пароль неверный.",
        okButtonText: "OK"
    };
    optionsAlert3 = {
        title: "Заполните все поля!",
        message: "Введите логин!",
        okButtonText: "OK"
    };
    optionsAlert4 = {
        title: "Заполните все поля!",
        message: "Введите пароль!",
        okButtonText: "OK"
    };
    authModelResp: AuthModel;
    login: string='';
    password: string='';
    isLoggingIn = true;
    constructor(private page: Page, private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
    toggleDisplay($event) {
        this.router.navigate(['signup']);
    }

    submit() {
        if(this.login=='')
            alert(this.optionsAlert3)
        if(this.password=='')
            alert(this.optionsAlert4)
        if(this.login!=''&&this.password!='') {
            const appSettings = require("tns-core-modules/application-settings");
            this.authService.loginAuth(this.login, this.password).subscribe((x) => {
                    appSettings.setString("token", x.headers.get("Authorization"));
                    this.authModelResp = <AuthModel>x.body;
                    appSettings.setString("id_acc", String(this.authModelResp.accId));
                    appSettings.setString("id_user", String(this.authModelResp.userId));
                    appSettings.setString("psw_user", String(this.password));
                    this.router.navigate(['check_enter'])
                },
                (error1: ErrorModel) => {
                    console.log(error1.status)
                    if (error1.status == 500) {
                        alert(this.optionsAlert1)
                    } else if (error1.status == 401 || error1.status == 403)
                        alert(this.optionsAlert2)
                }
            );

        }


    }
    setLogin(args: EventData){
        const tv = args.object as TextView;
        this.login=tv.text;
    }

    setPsw(args: EventData){
        const tv = args.object as TextView;
        this.password=tv.text;
    }

}
