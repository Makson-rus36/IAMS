import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventData, Page, TextView} from '@nativescript/core';
import {UserMessage} from '../models/userMessage'
import {DatePipe} from '@angular/common';
import {ModelUser} from '@src/app/models/modelUser';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
    textMessage: string='';
    isTap:boolean = false;
    userData: ModelUser=new ModelUser();
    id:string='1';
    mes1: UserMessage= new UserMessage();
    mes2: UserMessage= new UserMessage();
    messages: UserMessage[]=[];
    constructor(private date1:DatePipe, private page:Page,private router: Router) {
    }
    ngOnInit() {
        this.messages.forEach(value=> {
            var date = new Date(value.time);
            value.time = this.date1.transform(date,"MM/d/yy, hh:mm a");
        });
        this.page.actionBarHidden = true;
    }

    goToHome($event){
        this.router.navigate(['home']);
    }

    addMessage($event){
        let mes =new UserMessage();
        mes.id=this.id;
        mes.name='Макс';
        mes.message=this.textMessage;
        mes.time = '2021-03-13 19:03:14';

        this.messages.push(mes);
        this.messages.forEach(value=> {
            var date = new Date(value.time);
            value.time = this.date1.transform(date,"MM/d/yy, hh:mm a");
        });
    }

    onTextChange(args: EventData) {
        const tv = args.object as TextView;
        this.textMessage=tv.text;
    }

}
