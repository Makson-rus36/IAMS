import {Component, OnInit} from '@angular/core';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {Subscription} from 'rxjs';
import {AndroidActivityBackPressedEventData, AndroidApplication, ObservableArray, Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {ErrorModel} from '@src/app/models/error.model';
import {Country, DataService} from '@src/app/models/test_DataService';
import {ModelHistoryChange} from '@src/app/models/modelHistoryChange';
import {DatePipe} from '@angular/common';
import * as application from 'tns-core-modules/application';

@Component({
    moduleId: module.id,
    selector:'app-full-profile',
    templateUrl:'./profile.user.full.html',
    styleUrls:['./profile.user.full.css'],
    providers: [DataService]
})

export class ProfileUserFull implements OnInit{


    private _categoricalSource: ObservableArray<ModelHistoryChangesWeight>;
    private _categoricalSourcePressure: ObservableArray<ModelHistoryChangesPressure>;
    private _categoricalSourcePulse: ObservableArray<ModelHistoryChangesPulse>;
    get categoricalSource(): ObservableArray<ModelHistoryChangesWeight> {
        return this._categoricalSource;
    }

    get categoricalSourcePressure(): ObservableArray<ModelHistoryChangesPressure> {
        return this._categoricalSourcePressure;
    }
    get categoricalSourcePulse(): ObservableArray<ModelHistoryChangesPulse>{
        return this._categoricalSourcePulse;
    }

    changesWeight: ModelHistoryChangesWeight[]=[]
    changesPressure: ModelHistoryChangesPressure[]=[]
    changesPulse: ModelHistoryChangesPulse[]=[]
    changesPulseRaw: ModelHistoryChange[]=[]
    changesWeightRaw: ModelHistoryChange[]=[]
    changesPressureRaw: ModelHistoryChange[]=[]

    minWeight: number=10;
    maxWeight: number=200;
    stepWeight: number=(this.maxWeight - this.minWeight)/5;

    minPressure: number=10;
    maxPressure: number=200;
    stepPressure: number=(this.maxPressure - this.minPressure)/10;

    minPulse=30;
    maxPulse=200;
    stepPulse=(this.maxPulse-this.minPulse)/4

    private id:number = -1;
    isShowAllDiagnosis=false;
    usersData: ModelUser;
    usersDiagnosis: DiagnosisModel[]=[];
    usersAllDiagnosis:DiagnosisModel[]=[];
    private diagnosis: Subscription;
    private idDiagnosis: string;
    constructor(private page:Page, private router:Router, private profileService: ProfileService, private activateRoute: ActivatedRoute, private diagnosService:DiagnosService,private _dataService: DataService, private datePipe: DatePipe) {
        this.diagnosis = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.id = queryParam['idUser'];
            }
        );
    }

    ngOnInit() {

        const appSettings = require("tns-core-modules/application-settings");
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/profile_user_full", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
        this.page.actionBarHidden = true;
        this.profileService.getInfoHealthTop(this.id).subscribe((x)=>{
            //console.log(x['content'])
            this.changesWeightRaw = <ModelHistoryChange[]>x['content'];
            this.changesPressureRaw = <ModelHistoryChange[]>x['content'];
            this.changesPulseRaw = <ModelHistoryChange[]>x['content'];
            //console.log(this.changesPulseRaw.length)
            this.changesWeightRaw = this.changesWeightRaw.filter(x=>{ if(x.typeChange.id == 11) return true;})
            this.changesPressureRaw = this.changesPressureRaw.filter(x=>{ if(x.typeChange.id == 12) return true;})
            this.changesPulseRaw = this.changesPulseRaw.filter(x=>{ if(x.typeChange.id == 13) return true;})
            for (let pulseChange of this.changesPulseRaw){
                //console.log(pulseChange.descriptionChange)
                this.changesPulse.push(new ModelHistoryChangesPulse(this.datePipe.transform(new Date(pulseChange.dateChange), "dd/MM/yy HH:mm"), Number(pulseChange.descriptionChange),pulseChange.id))
            }
            for(let pr of this.changesPressureRaw)
                this.changesPressure.push(new ModelHistoryChangesPressure(this.datePipe.transform(new Date(pr.dateChange), "dd/MM/yy HH:mm"), Number(pr.descriptionChange.split("/")[0]), Number(pr.descriptionChange.split("/")[1]), pr.id, "1"))
            for(let hc of this.changesWeightRaw)
                this.changesWeight.push(new ModelHistoryChangesWeight(this.datePipe.transform(new Date(hc.dateChange), "dd/MM/yy HH:mm"), Number(hc.descriptionChange), hc.id, "1"))

            this.changesPulse = this.changesPulse.sort((x,y)=>{
                return Date.parse(x.dateChange)-Date.parse(y.dateChange);
            })
            this.changesPressure = this.changesPressure.sort((x,y)=>{
                return Date.parse(x.dateChange)-Date.parse(y.dateChange);
            })
            this.changesWeight = this.changesWeight.sort((x,y)=>{
                return Date.parse(x.dateChange)-Date.parse(y.dateChange);
            })

            this._categoricalSource = new ObservableArray(this.changesWeight);
            this._categoricalSourcePressure = new ObservableArray<ModelHistoryChangesPressure>(this.changesPressure);
            this._categoricalSourcePulse = new ObservableArray<ModelHistoryChangesPulse>(this.changesPulse);
            //console.log(this.changesPulse.length)
            this.pulse_findMinMaxAvgVal(this.changesPulse);
            this.weight_findMinMaxAvgVal(this.changesWeight);
            this.pressure_findMinMaxAvgVal(this.changesPressure);

        }, error => {
            console.log(error)
        })
        this.profileService.getUsersDataWithId(this.id).subscribe((x:ModelUser)=>{
            this.usersData = x;
            this.diagnosService.getListDiagnosisWithDoctorIdAndPatientId(this.id,appSettings.getString("id_user")).subscribe((x)=>{
                this.usersDiagnosis = <DiagnosisModel[]>x['content']
            }, (error:ErrorModel) => {
                console.log(error)
            })
        }, (error:ErrorModel) => {
            console.log(error)
        })
        this.diagnosService.getListDiagnosisWithPatientId(this.id).subscribe((x)=>{
            this.usersAllDiagnosis = <DiagnosisModel[]>x['content']
        }, (error:ErrorModel) => {
            console.log(error)
        })
    }
    goToSearch($event){
        this.router.navigate(['home']);
    }

    addDiagnosis($event){
        this.router.navigate(['diagnosis_add'], {queryParams:{
                'user':this.id
            }})
    }

    changeDiagnosis(id){
        this.router.navigate(['diagnosis_change'], {queryParams:{
            "idDiagnosis":id
            }})
    }

    pulse_findMinMaxAvgVal(array: ModelHistoryChangesPulse[]){
        let min = array[0].descriptionChangePulse;
        let max = min;
        let avg = 0;
        for (let item of array) {
            if(item.descriptionChangePulse>max) max=item.descriptionChangePulse;
            if(item.descriptionChangePulse<min) min=item.descriptionChangePulse;
        }
        this.minPulse =min-10;
        this.maxPulse= max+20;
        avg = (max-min)/4;
        this.maxPulse+=avg;
        this.stepPulse = avg;

        //console.log(this.maxPulse);

    }

    weight_findMinMaxAvgVal(array: ModelHistoryChangesWeight[]){
        let min = array[0].descriptionChange;
        let max = min;
        let avg = 0;
        for (let item of array) {
            if(item.descriptionChange>max) max=item.descriptionChange;
            if(item.descriptionChange<min) min=item.descriptionChange;
        }
        avg = (max-min)/4;

        this.minWeight =min-10;
        this.maxWeight= max+10;
        this.stepWeight = avg;
    }

    pressure_findMinMaxAvgVal(array: ModelHistoryChangesPressure[]){
        let min = array[0].descriptionChangeLow;
        let max = array[0].descriptionChangeHigh;
        let avg = 0;
        for (let item of array) {
            if(item.descriptionChangeHigh>max) max=item.descriptionChangeHigh;
            if(item.descriptionChangeLow<min) min=item.descriptionChangeLow;
        }
        avg = (max-min)/10;

        this.minPressure =min-10;
        this.maxPressure= max+10;
        this.stepPressure = avg;
    }

    showListTreatment($event){
        this.isShowAllDiagnosis=true;
    }
    hideListTreatment($event){
        this.isShowAllDiagnosis=false;
    }
}

export class ModelHistoryChangesWeight {


    constructor(dateChange?: string, descriptionChange?: number, id?: number, legend?:string) {
        this.dateChange = dateChange;
        this.descriptionChange = descriptionChange;
        this.id = id;
        this.legend = legend
    }

    dateChange:string;
    descriptionChange: number;
    id: number;
    legend:string;
}
export class ModelHistoryChangesPressure {


    constructor(dateChange: string, descriptionChangeHigh: number, descriptionChangeLow: number, id: number, legend: string) {
        this.dateChange = dateChange;
        this.descriptionChangeHigh = descriptionChangeHigh;
        this.descriptionChangeLow = descriptionChangeLow;
        this.id = id;
        this.legend = legend;
    }

    dateChange:string;
    descriptionChangeHigh: number;
    descriptionChangeLow: number;
    id: number;
    legend:string;
}

export class ModelHistoryChangesPulse {


    constructor(dateChange: string, descriptionChangePulse: number, id: number) {
        this.dateChange = dateChange;
        this.descriptionChangePulse = descriptionChangePulse;
        this.id = id;
    }

    dateChange:string;
    descriptionChangePulse: number;
    id: number;
}

