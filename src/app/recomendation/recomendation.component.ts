import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {Subscription} from 'rxjs';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';

@Component({
    selector: 'app-recommendation',
    templateUrl: './recomendation.component.html',
    styleUrls: ['./recomendation.component.css']
})

export class RecomendationComponent implements OnInit {
    info:string;
    idD:string;
    private infoPage: Subscription;
    constructor(private page:Page, private router: Router, private activateRoute: ActivatedRoute, private diagnosService: DiagnosService) {
        this.infoPage = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.idD = queryParam['idDiagnosis'];
            }
        );
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.diagnosService.getDiagnosWithId(this.idD).subscribe((x:DiagnosisModel)=>{
            this.info = x.descriptionD;
        })
    }

    goToHome($event){
        this.router.navigate(['home']);
    }

}
