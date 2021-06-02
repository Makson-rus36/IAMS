import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventData, Page, ScrollView, TextView} from '@nativescript/core';
import {UserMessage} from '../models/userMessage'
import {DatePipe} from '@angular/common';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ProfileService} from '@src/app/services/profile.service';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {interval, Subscription} from 'rxjs';
import {ErrorModel} from '@src/app/models/error.model';
import {ChatService} from '@src/app/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
    @ViewChild('messagesList') private myScrollContainer: ElementRef<ScrollView>;
    textMessage: string='';
    isTap:boolean = false;
    isUpdMesEnb = false;
    isLoadProfiles = false;isLoadMessages = false;
    isFirstInit = false;
    userData: ModelUser=new ModelUser();
    doctorData: ModelUser=new ModelUser();
    diagnos: DiagnosisModel;
    id:string='1';
    scrollElem: ScrollView;
    messages: UserMessage[]=[];
    newMessages: UserMessage[]=[];
    private diagnosis: Subscription;
    private idDiagnosis: string;
    private disableScrollDown: Boolean=false;
    constructor(private date1:DatePipe, private page:Page,private router: Router, private profileService: ProfileService,
                private diagnosService: DiagnosService,private activateRoute: ActivatedRoute, private chatService: ChatService) {
        this.diagnosis = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.idDiagnosis = queryParam['idDiagnosis'];
            }
        );
        interval(3000).subscribe(x => {
            if(this.isUpdMesEnb)
                this.updateMessages();
        });
        interval(200).subscribe(x=>{
            if(!this.disableScrollDown)
               this.scrollElem.scrollToVerticalOffset(this.scrollElem.scrollableHeight, false);
        })
    }

    /*addMessages(){
        let message = new UserMessage();
        message.messageData = "ol";
        message.recipientId = 50;
        message.senderId = 25;
        message.dateMessage = (new Date()).toISOString();
        this.messages.push(message)
    }*/

    ngOnInit() {
        const appSettings = require("tns-core-modules/application-settings");
        this.diagnosService.getDiagnosWithId(this.idDiagnosis).subscribe((x:DiagnosisModel)=>{
           this.profileService.getUsersDataWithId(x.patientId).subscribe((p:ModelUser)=>{
               if(appSettings.getString("id_user")==x.patientId)
                    this.userData = p;
               else
                   this.doctorData = p;
               this.profileService.getUsersDataWithId(x.doctorId).subscribe((d:ModelUser)=>{
                   if(appSettings.getString("id_user")!=x.patientId)
                       this.userData = d;
                   else
                       this.doctorData = d;
                   this.isUpdMesEnb = true;
               }, (error: ErrorModel) => {
                   console.log(error)
               })
               this.isLoadProfiles=true;
           }, (error: ErrorModel) => {
               console.log(error)
           })

        }, (error: ErrorModel) => {
            console.log(error)
        })

        this.page.actionBarHidden = true;
    }

    goToHome($event){
        this.router.navigate(['home']);
    }

    addMessage($event){

    }

    onTextChange(args: EventData) {
        const tv = args.object as TextView;
        this.textMessage=tv.text;
    }


    private updateMessages() {
        this.chatService.getListMessages(this.userData.id, this.doctorData.id).subscribe((x)=>{
            this.newMessages = this.newMessages.concat((<UserMessage[]>x['content']))
            this.chatService.getListMessages(this.doctorData.id, this.userData.id).subscribe((x)=>{
                this.newMessages = this.newMessages.concat((<UserMessage[]>x['content']))
                this.isLoadMessages=true;
                if(this.newMessages.length!=this.messages.length) {
                    this.messages = this.newMessages;
                    this.messages = this.messages.sort((x, y) => {
                        if (new Date(x.messageData) > new Date(y.messageData))
                            return 1;
                        else if (new Date(x.messageData) > new Date(y.messageData))
                            return -1;
                        else
                            return 0;
                    })
                    this.messages.forEach(value => {
                        var date = new Date(value.dateMessage);
                        value.dateMessage = this.date1.transform(date, "MM/d/yy, hh:mm a");
                    });
                    if(!this.isFirstInit){
                        this.isFirstInit = true;
                        this.scrollElem.scrollToVerticalOffset(this.scrollElem.scrollableHeight, false);
                        this.disableScrollDown=false;
                    }

                }
            }, error => {
                console.log(error)
            });
        }, error => {
            console.log(error)
        });
    }

    scrollEvent(){
        if(this.isFirstInit)
        if(this.scrollElem.scrollableHeight==this.scrollElem.verticalOffset)
            this.disableScrollDown=false;
        else
            this.disableScrollDown=true;
    }

    onScroll(data:EventData) {
        this.scrollElem = <ScrollView>data.object;
    }
}
