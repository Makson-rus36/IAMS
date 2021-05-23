import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccModel} from '@src/app/models/acc.model';
import {ErrorModel} from '@src/app/models/error.model';


@Injectable()
export class ProfileService {
    constructor(private httpClient: HttpClient) {
    }

    sendInfoHealth(weight:number, pulse: number, pressure: string){

    }

    getAccData(){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        return  this.httpClient.get("https://chf-back.herokuapp.com/api/accounts-users/"+appSettings.getString("id_acc"), {headers:header});
    }
    getUsersData(){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        return this.httpClient.get("https://chf-back.herokuapp.com/api/users-data/"+appSettings.getString("id_user"), {headers:header});
    }

    sendUsersData(name:string, lastName: string, middleName: string){

    }

}
