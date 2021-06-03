import {Component, OnInit} from '@angular/core';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {Subscription} from 'rxjs';
import {ObservableArray, Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {ErrorModel} from '@src/app/models/error.model';
import {Country, DataService} from '@src/app/models/test_DataService';
import {ModelHistoryChange} from '@src/app/models/modelHistoryChange';
import {DatePipe} from '@angular/common';

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
    get categoricalSource(): ObservableArray<ModelHistoryChangesWeight> {
        return this._categoricalSource;
    }

    get categoricalSourcePressure(): ObservableArray<ModelHistoryChangesPressure> {
        return this._categoricalSourcePressure;
    }

    changesWeight: ModelHistoryChangesWeight[]=[]
    changesPressure: ModelHistoryChangesPressure[]=[]
    changesWeightRaw: ModelHistoryChange[]=[]
    changesPressureRaw: ModelHistoryChange[]=[]

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

        this.page.actionBarHidden = true;
        this.profileService.getInfoHealthTop(this.id).subscribe((x)=>{
            console.log(x['content'])
            this.changesWeightRaw = <ModelHistoryChange[]>x['content'];
            this.changesPressureRaw = <ModelHistoryChange[]>x['content'];
            this.changesWeightRaw = this.changesWeightRaw.filter(x=>{ if(x.typeChange.id == 11) return true;})
            this.changesPressureRaw = this.changesPressureRaw.filter(x=>{ if(x.typeChange.id == 12) return true;})

            for(let pr of this.changesPressureRaw)
                this.changesPressure.push(new ModelHistoryChangesPressure(this.datePipe.transform(new Date(pr.dateChange), "dd/MM/yy"), Number(pr.descriptionChange.split("/")[0]), Number(pr.descriptionChange.split("/")[1]), pr.id, "1"))
            for(let hc of this.changesWeightRaw)
            this.changesWeight.push(new ModelHistoryChangesWeight(this.datePipe.transform(new Date(hc.dateChange), "dd/MM/yy"), Number(hc.descriptionChange), hc.id, "1"))
            this.changesWeight = this.changesWeight.filter((v,i,a)=>a.findIndex(t=>(t.dateChange === v.dateChange))===i)
            this.changesPressure = this.changesPressure.filter((v,i,a)=>a.findIndex(t=>(t.dateChange === v.dateChange))===i)
            this._categoricalSource = new ObservableArray(this.changesWeight);
            this._categoricalSourcePressure = new ObservableArray<ModelHistoryChangesPressure>(this.changesPressure);
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
        this.router.navigate(['search']);
    }

    addDiagnosis($event){
        this.router.navigate(['diagnosis_add'], {queryParams:{
                'user':this.id
            }})
    }

    changeDiagnosis($event){

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

