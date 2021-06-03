import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserMessage} from '@src/app/models/userMessage';

@Injectable()
export class ChatService {

    constructor(private httpClient: HttpClient) {
    }
    getListMessages(idPatient, idDoctor, pageSize=20){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/messages-users?recipientId="+idPatient+"&senderId="+idDoctor+"&sort=id,DESC&size="+pageSize+"&page=0", {headers:header})
    }

    sendNewMessage(message: UserMessage){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let body={
            "dateMessage": message.dateMessage,
            "messageData": message.messageData,
            "recipientId": message.recipientId,
            "senderId": appSettings.getString("id_user")
        }

        this.httpClient.post("https://chf-back.herokuapp.com/api/messages-users", body, {headers:header}).subscribe(x=>{
            //console.log(x);
        }, error => {
            console.log(error)
        })
    }

}
