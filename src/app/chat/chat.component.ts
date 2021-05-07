import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';
import {UserMessage} from './models/userMessage'

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
    id:string='1';
    mes1: UserMessage= new UserMessage();
    mes2: UserMessage= new UserMessage();
    messages: UserMessage[]=[];
    constructor(private page:Page,private router: Router) {
    }
    ngOnInit() {
        this.mes1.name = 'alex';
        this.mes1.id = '1';
        this.mes1.message = 'mess';

        this.mes2.name = 'ass';
        this.mes2.id = '2';
        this.mes2.message = 'mdcss';

        this.messages.push(this.mes1, this.mes2, this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2,this.mes2);
        this.page.actionBarHidden = true;
    }


}
