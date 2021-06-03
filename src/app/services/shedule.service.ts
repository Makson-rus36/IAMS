import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SheduleService {
    constructor(private httpClient:HttpClient) {
    }

    getTreatmentCourses(idDiagnosis){
        const appSettings = require("tns-core-modules/application-settings");
        let header = {'Authorization':"Bearer "+appSettings.getString("token")}
        return this.httpClient.get("https://chf-back.herokuapp.com/api/treatment-courses?diagnosisId="+idDiagnosis, {headers:header})
    }
}
