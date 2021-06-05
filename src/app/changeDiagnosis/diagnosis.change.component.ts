import {Component, OnInit} from '@angular/core';
import {
    AndroidActivityBackPressedEventData,
    AndroidApplication,
    EventData,
    ItemEventData,
    Page,
    TextField,
    TextView
} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {interval, Subscription} from 'rxjs';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ErrorModel} from '@src/app/models/error.model';
import {ProfileService} from '@src/app/services/profile.service';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {PillsModel} from '@src/app/models/pillsModel';
import {DatePickerField} from '@nativescript/datetimepicker/ui/date-picker-field.android';
import {DatePipe} from '@angular/common';
import {SheduleService} from '@src/app/services/shedule.service';
import * as application from 'tns-core-modules/application';

@Component({
    selector: 'app-diagn-change',
    templateUrl: './diagnosis.change.component.html',
    styleUrls: ['./diagnosis.change.component.css']
})

export class DiagnosisChangeComponent implements OnInit{
    private idDiagnosis = -1;
    private idUser=-1;
    isCreatePill=false;
    isLoadedDiagnosisData=false;
    isLoadedPillData=false;
    isShowListPills=false;
    indexChange = -1;
    isShowListTreatment = false;
    isEditTreatment:boolean=false;
    isAddTreatment:boolean=false;
    minDate1 = new Date();
    minDate2 = new Date();
    usersData: ModelUser;
    diagnosis: DiagnosisModel;
    newPillItem:PillsModel;
    pills: PillsModel[]=[];
    course: TreatmentCourseModel[]=[];
    oldCourse:TreatmentCourseModel[]=[];
    delCourses:TreatmentCourseModel[]=[];
    newCourse:TreatmentCourseModel;
    editCourse:TreatmentCourseModel;
    private querySubscription: Subscription;
    constructor(private page:Page, private router:Router, private diagnosService: DiagnosService, private activateRoute: ActivatedRoute,
                private profileService: ProfileService, private datePipe: DatePipe, private sheduleService:SheduleService) {
        this.querySubscription = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.idDiagnosis = queryParam['idDiagnosis'];
            }
        );
    }

    ngOnInit() {
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/diagnosis_change", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
        this.diagnosis = new DiagnosisModel();
        this.diagnosis.nameD = "Загрузка..."
        this.diagnosis.descriptionD = "Загрузка..."
        this.page.actionBarHidden = true;
        this.diagnosService.getPillsList().subscribe(x=>{
            this.pills = <PillsModel[]>x['content']
            console.log(this.pills)
        }, error => {
            console.log(error)
        })
        this.minDate2 = new Date(this.minDate1.getFullYear(), this.minDate1.getMonth(), this.minDate1.getDate()+1)
        const appSettings = require("tns-core-modules/application-settings");
        this.diagnosService.getDiagnosWithId(this.idDiagnosis).subscribe(x=>{
            this.diagnosis = <DiagnosisModel>x;
            this.idUser = this.diagnosis.patientId;
            this.isLoadedDiagnosisData = true;
        }, error => {
            console.log(error)
        })
        this.sheduleService.getTreatmentCourses(this.idDiagnosis).subscribe(x=>{
            this.course = <TreatmentCourseModel[]>x['content']
            for (let treatmentCourseModel of this.course) {
                this.diagnosService.getPill(treatmentCourseModel.medicamentsId).subscribe((pill:PillsModel)=>{
                    treatmentCourseModel.medicaments = pill;
                })
            }
            this.oldCourse = this.oldCourse.concat(this.course);
            this.isShowListTreatment=true;
            this.isLoadedPillData=true;
            //console.log(x)
        }, error => {
            console.log(error)
        })
    }

    test_create(pill:PillsModel){
        console.log(pill.id)
    }

    cancel($event){
        this.router.navigate(['profile_user_full'],{
            queryParams:{
                "idUser":this.idUser
            }
        })
    }

    editNameDiagnosis(args: EventData){
        this.diagnosis.nameD = (<TextField>args.object).text;

    }

    editDescriptionDiagnosis(args: EventData){
        this.diagnosis.descriptionD = (<TextField>args.object).text;
    }

    addTreatment($event){
        this.isShowListTreatment = true;
        this.newCourse  = new TreatmentCourseModel();
        this.newCourse.medicaments = new PillsModel();
        this.newCourse.medicaments.nameM = "";
        this.newCourse.medicationSchedule = "";
        this.newCourse.diagnosisId = 0;
        this.newCourse.supplementationMedicament="";
        this.newCourse.timeCourseStart="";
        this.newCourse.timeCourseEnd="";
        this.isAddTreatment = true;

    }

    cancelAddTreatment($event){
        this.isAddTreatment = false;
    }

    cancelEditTreatment($event){
        this.isEditTreatment = false;
    }

    showListPills($event){
        this.isShowListPills = true;
    }

    hideListPills($event){
        this.isShowListPills = false;
    }

    selectPill(args: ItemEventData){
        if(this.isAddTreatment)
        {
            this.newCourse.medicaments = this.pills[args.index];
            this.newCourse.medicamentsId = this.pills[args.index].id;
        }
        if(this.isEditTreatment){
            this.editCourse.medicaments=this.pills[args.index];
            this.editCourse.medicamentsId = this.pills[args.index].id
        }
        this.isShowListPills = false;
    }

    addScheduleTreatment(args:EventData){
        this.newCourse.medicationSchedule = (<TextField>args.object).text;
    }

    addDoseTreatment(args:EventData){
        this.newCourse.supplementationMedicament = (<TextField>args.object).text;
    }

    addonDateStartChange(args:EventData){
        this.newCourse.timeCourseStart = (<DatePickerField>args.object).date.toISOString();
    }

    addonDateEndChange(args:EventData){
        this.newCourse.timeCourseEnd = (<DatePickerField>args.object).date.toISOString();
    }

    addNewTreatment($event){
        let optionsAlert1 = {
            title: "Заполните поля.",
            message: "Необходимо заполнить все поля",
            okButtonText: "OK"
        };
        if(this.newCourse.medicaments.id!=0&&this.newCourse.supplementationMedicament!=""&&this.newCourse.medicationSchedule!=""&&
            this.newCourse.timeCourseStart!=""&&this.newCourse.timeCourseEnd!=""){
            this.course.push(this.newCourse);
            this.isAddTreatment = false;
        }else{
            alert(optionsAlert1);
        }
    }

    showListTreatment($event){
        this.isShowListTreatment = true;
    }

    hideListTreatment($event){
        this.isShowListTreatment = false;
    }

    getDate(date:string){
        let dateE = new Date(date);
        return this.datePipe.transform(dateE, "dd/MM/yyyy");
        // return dateE.getFullYear()+"/"+(dateE.getMonth()+1)+"/"+dateE.getDate();
    }

    changeTreatment(treatment){
        this.editCourse = treatment;
        this.indexChange = this.course.findIndex(value => value==treatment);
        this.isEditTreatment = true;
        console.log(this.indexChange);
    }
    delTreatment(treatment){

        if(this.oldCourse.findIndex(value=>value==treatment)!=-1)
            this.delCourses.push(treatment);
        this.course = this.course.filter(value => value!=treatment);
    }

    updatePill(pill){
        this.editCourse.medicaments = pill;
    }

    getObjDate(dateString:string){
        return new Date(dateString);
    }

    editTreatment($event){
        this.course[this.indexChange] = this.editCourse;
        this.isEditTreatment = false;
    }

    editScheduleTreatment(args: EventData){
        this.editCourse.medicationSchedule = (<TextField>args.object).text;
    }

    editDoseTreatment(args: EventData){
        this.editCourse.supplementationMedicament = (<TextField>args.object).text;
    }

    onEditDateStartChange(args:EventData){
        this.editCourse.timeCourseStart = (<DatePickerField>args.object).date.toISOString();
    }
    onEditDateEndChange(args:EventData){
        this.editCourse.timeCourseEnd = (<DatePickerField>args.object).date.toISOString();
    }

    saveDiagnosis($event){
        console.log(this.oldCourse)
        console.log("\n/\n")
        console.log(this.course)
        this.diagnosService.updateDiagnosis(this.diagnosis).subscribe(x=>{console.log(x)}, error => {console.log(error)});
        for (let item of this.course) {
            let indexIsExist = this.oldCourse.findIndex(value => item==value);
            if(indexIsExist!=-1) {
                console.log('PUT');
                console.log(item.medicamentsId)
                this.diagnosService.updateTreatmentCourse(item).subscribe(x=>{console.log(x)}, error => {console.log(error)});
            }
            else {
                console.log('POST');
                let bodyTreatment={
                    "diagnosisId":this.idDiagnosis,
                    "medicamentsId": item.medicaments.id,
                    "medicationSchedule":item.medicationSchedule,
                    "supplementationMedicament": item.supplementationMedicament,
                    "timeCourseEnd": item.timeCourseEnd,
                    "timeCourseStart": item.timeCourseStart
                }
                this.diagnosService.addTreatmentCourse(bodyTreatment)
            }
        }
        for (let delItem of this.delCourses){
            this.diagnosService.deleteTreatmentCourse(delItem.id).subscribe(x=>{console.log(x)}, error => {console.log(error)});
            console.log("DEL")
        }
        this.router.navigate(['profile_user_full'],{
            queryParams:{
                "idUser":this.idUser
            }
        })
    }

    createPill($event){
        this.diagnosService.addPill(this.newPillItem).subscribe((x:PillsModel)=>{
            this.pills.push(x)
            this.isCreatePill=false;
            this.isShowListPills = false;
            this.isShowListPills = true;
        }, error => {
            console.log(error)
            this.isCreatePill=false;
            this.isShowListPills = false;
            this.isShowListPills = true;
        })
    }
    changeNamePill(args:EventData){
        this.newPillItem.nameM=(<TextField>args.object).text;
    }
    changeDecrpPill(args:EventData){
        this.newPillItem.descriptionM=(<TextView>args.object).text;
    }
    newPill($event){
        this.newPillItem= new PillsModel();
        this.newPillItem.nameM ='';
        this.newPillItem.descriptionM ='';
        this.isCreatePill=true;
    }

    deleteDiagnosis($event){
        let options = {
            title: "Выйти",
            message: "Вы действительно хотите удалить диагноз?",
            okButtonText: "Да",
            cancelButtonText: "Нет"
        };
        // @ts-ignore
        confirm(options).then((result: boolean) => {
            if(result==true)
            {
                let flag=true;
                for (let item of this.oldCourse) {
                    this.diagnosService.deleteTreatmentCourse(item.id).subscribe(x=>{console.log(x)}, error => {console.log(error)});
                    this.oldCourse = this.oldCourse.filter(value => value!=item);
                }
                interval(200).subscribe(x=>{
                    if(this.oldCourse.length==0&&flag){
                        console.log("s")
                        this.diagnosService.deleteDiagnosis(this.idDiagnosis).subscribe(x=>{console.log(x)}, error => {console.log(error)})
                        flag=false;
                        this.router.navigate(['profile_user_full'],{
                            queryParams:{
                                "idUser":this.idUser
                            }
                        })
                    }
                })
            }
        });
    }

}
