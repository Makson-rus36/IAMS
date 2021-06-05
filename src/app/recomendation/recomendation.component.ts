import {Component, OnInit} from '@angular/core';
import {AndroidActivityBackPressedEventData, AndroidApplication, Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {Subscription} from 'rxjs';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import * as application from 'tns-core-modules/application';

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
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/recommendation", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
        this.page.actionBarHidden = true;
        this.diagnosService.getDiagnosWithId(this.idD).subscribe((x:DiagnosisModel)=>{
            this.info = x.descriptionD;
        })
    }

    goToHome($event){
        this.router.navigate(['home']);
    }

}
