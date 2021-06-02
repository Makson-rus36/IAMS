import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {ErrorModel} from '@src/app/models/error.model';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ModelUser} from '@src/app/models/modelUser';
import {ProfileService} from '@src/app/services/profile.service';
import {ModelSearchWithPatient} from '@src/app/models/ModelSearchWithPatient';

@Component({
    selector: 'app-menu',
    templateUrl: './menudiagnosis.component.html',
    styleUrls: ['./menudiagnosis.component.css']
})

export class MenudiagnosisComponent implements OnInit{

    isLoadedPage = false;
    counterUsers=0;
    typeAccess:string = "";
    diagnosis: DiagnosisModel[]=[];
    dataPatinent: ModelSearchWithPatient[]=[];
    pageGo: string="";
    pageFrom: string="";
    redirPage: Subscription;
    constructor(private page:Page, private router:Router, private activateRoute: ActivatedRoute, private diagnosService: DiagnosService, private profileService: ProfileService) {
        this.redirPage = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.pageGo = queryParam['go'];
                this.pageFrom = queryParam['from'];
            }
        );
    }

    ngOnInit() {
        this.page.actionBarHidden=true;
        const appSettings = require("tns-core-modules/application-settings");
        this.typeAccess = appSettings.getString("acc_access");
        if(this.typeAccess=='DOCTOR'){
            this.diagnosService.getListDiagnosisWithDoctorId(appSettings.getString("id_user")).subscribe(x=>{
                this.diagnosis = <DiagnosisModel[]>x["content"];
                this.diagnosis = this.diagnosis.filter((v,i,a)=>a.findIndex(t=>(t.patientId === v.patientId))===i)
                for (let diagnosD of this.diagnosis) {
                    let data = new ModelSearchWithPatient();
                    data.modelDiagnosisData = diagnosD;
                    this.profileService.getUsersDataWithId(diagnosD.patientId).subscribe((x:ModelUser)=>{
                        data.modelUserData = x;
                        this.counterUsers+=1;
                    }, (error:ErrorModel) => {
                        console.log(error)
                    })
                    this.dataPatinent.push(data);
                }
        this.isLoadedPage=true;
            }, (error: ErrorModel) => {
                console.log(error)
            })
        }else
        this.diagnosService.getListDiagnosisWithPatientId(appSettings.getString("id_user")).subscribe(x=>{
            this.diagnosis = <DiagnosisModel[]>x["content"];
        }, (error: ErrorModel) => {
            console.log(error)
        })
    }

    goPage(idDiagnosis){

        this.router.navigate([this.pageGo], {queryParams:{
            "idDiagnosis":idDiagnosis
        }})
    }

    goToBack($event){
        this.router.navigate([this.pageFrom])
    }
}
