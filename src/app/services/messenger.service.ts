import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MessengerService {
    constructor(private httpClient: HttpClient) {
    }

    getMessages(page:number, size:number=30){

    }

    sendMessage(){

    }
}
