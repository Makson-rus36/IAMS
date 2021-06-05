import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AndroidActivityBackPressedEventData,
    AndroidApplication,
    EventData,
    Page,
    ScrollView,
    TextView
} from '@nativescript/core';
import {UserMessage} from '../models/userMessage'
import {DatePipe} from '@angular/common';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ProfileService} from '@src/app/services/profile.service';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {interval, Subscription} from 'rxjs';
import {ErrorModel} from '@src/app/models/error.model';
import {ChatService} from '@src/app/services/chat.service';
import * as application from 'tns-core-modules/application';
import {utils} from 'protractor';
import { isIOS, isAndroid } from 'tns-core-modules/platform';
import * as utils1 from 'tns-core-modules/utils/utils';
declare const UIApplication;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
    @ViewChild('messagesList') private myScrollContainer: ElementRef<ScrollView>;
    textMessage: string='';
    pageSize=20;
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
        interval(1000).subscribe(x => {
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

        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/chat", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
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
        this.isUpdMesEnb = false;
        this.router.navigate(['home']);
    }

    addMessage($event){
        let newMessage = new UserMessage();
        newMessage.messageData = this.textMessage;
        newMessage.recipientId = Number(this.doctorData.id);
        newMessage.dateMessage = (new Date().toISOString())
            if (isIOS) {
                UIApplication.sharedApplication.keyWindow.endEditing(true);
            }
            if (isAndroid) {
                utils1.ad.dismissSoftInput();
            }
            this.textMessage="";
        this.chatService.sendNewMessage(newMessage)
    }

    onTextChange(args: EventData) {
        const tv = args.object as TextView;
        this.textMessage=tv.text;
    }


    private updateMessages() {
        this.newMessages = [];
        //console.log("upd:s")
        this.chatService.getListMessages(this.userData.id, this.doctorData.id, this.pageSize).subscribe((x)=>{
            //console.log(x)
            this.newMessages = this.newMessages.concat((<UserMessage[]>x['content']))
            this.chatService.getListMessages(this.doctorData.id, this.userData.id, this.pageSize).subscribe((y)=>{
                //console.log(y)
                this.newMessages = this.newMessages.concat((<UserMessage[]>y['content']))
                this.isLoadMessages=true;
                //console.log(this.newMessages.length+"/"+this.messages.length)
                if(this.newMessages.length!=this.messages.length) {
                    //this.messages = this.newMessages;
                    this.newMessages = this.newMessages.sort((x1, y1) => {
                        //console.log("d2"+Date.parse(y1.dateMessage)+"/d1"+Date.parse(x1.dateMessage))
                        return Date.parse(x1.dateMessage) - Date.parse(y1.dateMessage)
                    })
                    //console.log("from: "+(this.newMessages.length-this.pageSize)+" to"+this.newMessages.length)
                    if(this.newMessages.length<this.pageSize)
                        this.newMessages = this.newMessages.slice(0,this.newMessages.length)
                    else
                        this.newMessages = this.newMessages.slice(this.newMessages.length-this.pageSize,this.newMessages.length)
                    //console.log(this.messages.length)
                    //console.log(this.messages)
                    this.newMessages.forEach(value => {
                        let d = new Date(new Date(Date.parse(value.dateMessage)).toLocaleString("ru-RU", {timeZone:"GMT"+(new Date().getTimezoneOffset() / 60)}));
                        d.setHours(d.getHours()-(new Date().getTimezoneOffset() / 60))
                        value.dateMessage = this.date1.transform(d, "MM/dd/yy, HH:mm");
                    });
                    this.messages = this.newMessages;
                    //console.log("upd:e")
                    if(!this.isFirstInit){
                        this.isFirstInit = true;
                        this.disableScrollDown=false;
                        this.scrollElem.scrollToVerticalOffset(this.scrollElem.scrollableHeight, false);
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
        //console.log(this.scrollElem.verticalOffset)
        if(this.isFirstInit){
            if(this.scrollElem.verticalOffset==0){
                this.pageSize+=20;
                this.isLoadMessages=false;
            }
        if(this.scrollElem.scrollableHeight==this.scrollElem.verticalOffset)
            this.disableScrollDown=false;
        else
            this.disableScrollDown=true;
        }
    }

    onScroll(data:EventData) {
        this.scrollElem = <ScrollView>data.object;
    }
}
