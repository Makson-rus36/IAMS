import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ErrorModel} from '@src/app/models/error.model';

@Injectable()
export class DiagnosService {
    constructor(private httpClient: HttpClient) {
    }

    getListDiagnosis(id){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/diagnosis?patientId="+id, {headers:header})
    }

    addDiagnosis(descrp:string, doctor_id:number, name_diagn: string, patient_id:number){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let body={
            "descriptionD": descrp,
                "doctorId": doctor_id,
                "nameD": name_diagn,
                "patientId":patient_id
        }

        return this.httpClient.post("https://chf-back.herokuapp.com/api/diagnosis", body, {headers:header})

    }

    getPillsList(){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/medicaments-data", {headers:header})
    }
}
