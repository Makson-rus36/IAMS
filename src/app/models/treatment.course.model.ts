import {PillsModel} from '@src/app/models/pillsModel';

export class TreatmentCourseModel {
    id:number
    medicationSchedule:string;
    supplementationMedicament:string;
    timeCourseEnd:string;
    timeCourseStart:string;
    diagnosisId:number;
    medicaments: PillsModel;
}
