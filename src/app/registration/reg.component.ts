import {Component, OnInit} from '@angular/core';
import {EventData, Page, TextField, TextView} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})

export class RegComponent implements OnInit {
    nameUser = '';
    lastNameUser = '';
    otchUser = '';
    phoneNumberUser = '';
    emailUser = '';
    passwordUser = '';
    confirmPasswordUser = '';

    constructor(private page: Page, private router: Router) {
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    backAuth($event) {
        this.router.navigate(['enter']);
    }

    createAcc($event) {
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

        if(this.nameUser=='' || this.lastNameUser =='' || this.otchUser=='' ||this.phoneNumberUser=='' ||this.emailUser=='' ||this.passwordUser=='' || this.confirmPasswordUser=='')
            alert(optionsAlert1);
        else{
            if(this.confirmPasswordUser!=this.passwordUser)
                alert(optionsAlert2);
            else
                this.router.navigate(['home']);
        }
    }
    onTextChangeNameUser(args: EventData) {
        const tv = args.object as TextField;
        this.nameUser=tv.text;
    }
    onTextChangeLastNameUser(args: EventData) {
        const tv = args.object as TextView;
        this.lastNameUser=tv.text;
    }
    onTextChangeOtchUser(args: EventData) {
        const tv = args.object as TextView;
        this.otchUser=tv.text;
    }
    onTextChangePhoneUser(args: EventData) {
        const tv = args.object as TextView;
        this.phoneNumberUser=tv.text;
    }
    onTextChangeEmailUser(args: EventData) {
        const tv = args.object as TextView;
        this.emailUser=tv.text;
    }
    onTextChangePasswordUser(args: EventData) {
        const tv = args.object as TextView;
        this.passwordUser=tv.text;
    }
    onTextChangeConfirmPasswordUser(args: EventData) {
        const tv = args.object as TextView;
        this.confirmPasswordUser=tv.text;
    }
}
