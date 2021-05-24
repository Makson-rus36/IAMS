import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private httpService: HttpClient) {
    }

    updPassword(passwordAcc){
        const appSettings = require("tns-core-modules/application-settings");
        let header={

            "Content-Type": "application/json",
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let objRegBody={
            "passwordAcc": passwordAcc
        }
        return this.httpService.put("https://chf-back.herokuapp.com/api/accounts-users/"+appSettings.getString("id_acc"), objRegBody, {headers: header})
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

