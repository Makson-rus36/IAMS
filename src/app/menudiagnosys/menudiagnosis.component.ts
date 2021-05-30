import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {ErrorModel} from '@src/app/models/error.model';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menudiagnosis.component.html',
    styleUrls: ['./menudiagnosis.component.css']
})

export class MenudiagnosisComponent implements OnInit{

    diagnosis: DiagnosisModel[]=[];
    pageGo: string="";
    pageFrom: string="";
    redirPage: Subscription;
    constructor(private page:Page, private router:Router, private activateRoute: ActivatedRoute, private diagnosService: DiagnosService) {
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
