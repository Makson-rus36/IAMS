import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChatService {

    constructor(private httpClient: HttpClient) {
    }
    getListMessages(idPatient, idDoctor){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/messages-users?recipientId="+idPatient+"&senderId="+idDoctor, {headers:header})
    }

    sendNewMessage(){

    }

}
