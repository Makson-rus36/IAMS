import {Component, OnInit} from '@angular/core';
import {DatePicker, EventData, ListPicker, Page, TextField, TextView} from '@nativescript/core';
import {Router} from '@angular/router';
import {AuthService} from '@src/app/services/auth.service';
import {DatePickerField} from '@nativescript/datetimepicker/ui/date-picker-field.android';
import {DateTimePicker} from '@nativescript/datetimepicker';
import {DatePipe} from '@angular/common';
import {AuthModel} from '@src/app/models/auth.model';
import {ErrorModel} from '@src/app/models/error.model';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})

export class RegComponent implements OnInit {
    dateToday = new Date();
    minDate = new Date(this.dateToday.getFullYear()-14, this.dateToday.getMonth(), this.dateToday.getDate())
    objGender:Array<string> = ["MALE", "FEMALE"]
    objGenderName:Array<string> = ["Мужской", "Женский"]
    nameUser = '';
    lastNameUser = '';
    otchUser = '';
    phoneNumberUser = '';
    emailUser = '';
    passwordUser = '';
    confirmPasswordUser = '';
    gender = '';
    datebirthUser='';

    constructor(private page: Page, private router: Router, private authService: AuthService, private datePipe: DatePipe) {
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
        let optionsAlert3 = {
            title: "Пароль не надежный.",
            message: "Должно быть не менее 8 символов в поле пароль!",
            okButtonText: "OK"
        };
        let optionsAlert4 = {
            title: "Ошибка регистрации.",
            message: "При регистрации произошла ошибка. Данный электронный адрес (email) уже зарегистрирован.",
            okButtonText: "OK"
        };

        if(this.nameUser=='' || this.lastNameUser =='' || this.otchUser=='' ||this.phoneNumberUser=='' ||this.emailUser=='' ||this.passwordUser=='' || this.confirmPasswordUser==''
        || this.gender ==''|| this.datebirthUser=='')
            alert(optionsAlert1);
        else{
            if(this.confirmPasswordUser!=this.passwordUser)
                alert(optionsAlert2);
            else {
                if(this.passwordUser.length<8)
                    alert(optionsAlert3)
                else {
                    this.authService.createAuth(this.emailUser, this.emailUser,this.passwordUser, this.phoneNumberUser, this.datebirthUser, this.nameUser, this.gender, this.lastNameUser, this.otchUser).subscribe((x:AuthModel)=>{
                        if (x.accId>=0&&x.userId>=0){
                            this.router.navigate(['enter'])
                        }else {
                            alert("s")
                        }
                    }, (error:ErrorModel) => {
                        if(error.status==500){
                            alert(optionsAlert4)
                        }
                    });
                }
            }
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
    onSelectedGenderChanged(args: EventData){
        const picker = <ListPicker>args.object;
        this.gender = this.objGender[picker.selectedIndex];
    }
    onDateChange(args:EventData){
        const picker = <DatePickerField>args.object;
        this.datebirthUser = this.datePipe.transform(picker.date, "yyyy-MM-dd");
    }
}
