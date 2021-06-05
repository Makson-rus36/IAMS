import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {PillsModel} from '@src/app/models/pillsModel';

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

    getListDiagnosisWithPatientId(idPatient){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/diagnosis?patientId="+idPatient, {headers:header})
    }
    //patientId

    getListDiagnosisWithDoctorId(idDoctor){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/diagnosis?doctorId="+idDoctor, {headers:header})
    }
    getDiagnosWithId(id){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/diagnosis/"+id, {headers:header})
    }

    addPill(pill:PillsModel){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let body={
            "descriptionM": pill.descriptionM,
            "nameM": pill.nameM
        }
        return this.httpClient.post("https://chf-back.herokuapp.com/api/medicaments-data", body, {headers:header})
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

    addTreatmentCourse(body){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        this.httpClient.post("https://chf-back.herokuapp.com/api/treatment-courses", body, {headers:header}).subscribe(x=>{
           // console.log(x)
        }, error => {
            console.log(error)
        })

    }

    getPillsList(){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/medicaments-data", {headers:header})
    }

    getPill(id){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/medicaments-data/"+id, {headers:header})
    }

    getListDiagnosisWithDoctorIdAndPatientId(idPatient, idDoctor) {
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.get("https://chf-back.herokuapp.com/api/diagnosis?doctorId="+idDoctor+"&patientId="+idPatient, {headers:header})
    }

    updateDiagnosis(diagnos: DiagnosisModel){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let body={
            "descriptionD": diagnos.descriptionD,
            "doctorId": diagnos.doctorId,
            "id": diagnos.id,
            "nameD": diagnos.nameD,
            "patientId": diagnos.patientId
        }
        return this.httpClient.put("https://chf-back.herokuapp.com/api/diagnosis/"+diagnos.id, body,{headers:header})
    }

    updateTreatmentCourse(course: TreatmentCourseModel){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        let body={
            "diagnosisId": course.diagnosisId,
            "id": course.id,
            "medicamentsId": course.medicamentsId,
            "medicationSchedule": course.medicationSchedule,
            "supplementationMedicament": course.supplementationMedicament,
            "timeCourseEnd": course.timeCourseEnd,
            "timeCourseStart": course.timeCourseStart
        }
        return this.httpClient.put("https://chf-back.herokuapp.com/api/treatment-courses/"+course.id, body, {headers:header})
    }

    deleteTreatmentCourse(id){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.delete("https://chf-back.herokuapp.com/api/treatment-courses/"+id, {headers:header})
    }

    deleteDiagnosis(id){
        const appSettings = require("tns-core-modules/application-settings");
        let header={
            'Authorization':"Bearer "+appSettings.getString("token")
        }
        return this.httpClient.delete("https://chf-back.herokuapp.com/api/diagnosis/"+id, {headers:header})
    }
}
