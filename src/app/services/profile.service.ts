import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccModel} from '@src/app/models/acc.model';
import {ErrorModel} from '@src/app/models/error.model';
import {Router} from '@angular/router';


@Injectable()
export class ProfileService {
    constructor(private httpClient: HttpClient) {
    }

    getInfoHealth(){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        return this.httpClient.get("https://chf-back.herokuapp.com/api/history-change?user_id="+appSettings.getString("id_user"), {headers:header})
    }

    sendInfoHealth(weight:string, pulse: string, pressure: string, router: Router){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        let time = new Date();
        let timestr = time.toISOString()
        let body1={
            "dateChange":timestr,
            "descriptionChange": weight,
            "typeChange": {
                "id": 11
            },
            "usersDataId": appSettings.getString("id_user")
        }
        let body2={
            "dateChange":timestr,
            "descriptionChange": pulse,
            "typeChange": {
                "id": 13
            },
            "usersDataId": appSettings.getString("id_user")
        }
        let body3={
            "dateChange":timestr,
            "descriptionChange": pressure,
            "typeChange": {
                "id": 12
            },
            "usersDataId": appSettings.getString("id_user")
        }
        this.httpClient.post("https://chf-back.herokuapp.com/api/history-change?user_id="+appSettings.getString("id_user"),body1, {headers:header}).subscribe(x=>{
            this.httpClient.post("https://chf-back.herokuapp.com/api/history-change?user_id="+appSettings.getString("id_user"),body2, {headers:header}).subscribe(x=>{
                this.httpClient.post("https://chf-back.herokuapp.com/api/history-change?user_id="+appSettings.getString("id_user"),body3, {headers:header}).subscribe(x=>{
                    router.navigate(['home']);
                }, error => {console.log(error)})
            }, error => {console.log(error)})
        }, error => {console.log(error)})

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
