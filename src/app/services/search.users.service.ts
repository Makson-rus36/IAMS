import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SearchUsersService {
    constructor(private httpClient:HttpClient) {
    }

    searchUsers(){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        return this.httpClient.get("https://chf-back.herokuapp.com/api/accounts-users", {headers:header})
    }
}
