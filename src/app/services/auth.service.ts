import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trace} from '@nativescript/core';
import error = Trace.messageType.error;
import {AuthModel} from '@src/app/models/auth.model';

@Injectable()
export class AuthService {

    constructor(private httpService: HttpClient) {
    }

    updToken(){

    }

    createAuth(emailAcc, loginAcc, passwordAcc, phoneNumber, datebirth, firstname, gender, lastname, otchestvo){
        let header={
            "Content-Type": "application/json"
        }
        let objRegBody={
            "accessType": "PATIENT",
                "emailAcc": emailAcc,
                "loginAcc": loginAcc,
                "passwordAcc": passwordAcc,
                "phoneNumber": phoneNumber,
                "usersData": {
                "datebirth": datebirth,
                    "firstname": firstname,
                    "gender": gender,
                    "lastname": lastname,
                    "otchestvo": otchestvo
            }
        }
        return this.httpService.post("https://chf-back.herokuapp.com/auth/register", objRegBody, {headers: header})
    }

    logoutAuth(){

    }

    loginAuth(login:string, pass:string){
        return this.httpService.get("https://chf-back.herokuapp.com/auth/login?login="+login+"&password="+pass, {observe: 'response'})
    }

}

