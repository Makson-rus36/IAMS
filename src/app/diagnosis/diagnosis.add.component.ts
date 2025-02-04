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
import {Subscription} from 'rxjs';
import {ModelUser} from '@src/app/models/modelUser';
import {DiagnosisModel} from '@src/app/models/diagnosis.model';
import {ErrorModel} from '@src/app/models/error.model';
import {ProfileService} from '@src/app/services/profile.service';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {PillsModel} from '@src/app/models/pillsModel';
import {DatePickerField} from '@nativescript/datetimepicker/ui/date-picker-field.android';
import {DatePipe} from '@angular/common';
import * as application from 'tns-core-modules/application';

@Component({
    selector: 'app-diagn',
    templateUrl: './diagnosis.add.component.html',
    styleUrls: ['./diagnosis.add.component.css']
})

export class DiagnosisAddComponent implements OnInit{
    private idUser = -1;
    isShowListPills=false;
    indexChange = -1;
    isShowEditListPills = false;
    isShowListTreatment = false;
    isEditTreatment:boolean=false;
    isAddTreatment:boolean=false;
    minDate1 = new Date();
    minDate2 = new Date();
    usersData: ModelUser;
    diagnosis: DiagnosisModel;
    pills: PillsModel[]=[];
    course: TreatmentCourseModel[]=[];
    newCourse:TreatmentCourseModel;
    editCourse:TreatmentCourseModel;
    private querySubscription: Subscription;
    isCreatePill =false;
    newPillItem: PillsModel;
    constructor(private page:Page, private router:Router, private diagnosService: DiagnosService, private activateRoute: ActivatedRoute,
                private profileService: ProfileService, private datePipe: DatePipe) {
        this.querySubscription = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.idUser = queryParam['user'];
            }
        );
    }

    ngOnInit() {
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/diagnosis_add", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
        this.page.actionBarHidden = true;
        this.minDate2 = new Date(this.minDate1.getFullYear(), this.minDate1.getMonth(), this.minDate1.getDate()+1)
        const appSettings = require("tns-core-modules/application-settings");
        this.diagnosis = new DiagnosisModel();
        this.diagnosis.doctorId = appSettings.getString('id_user');
        this.diagnosis.patientId = this.idUser;
        this.profileService.getUsersDataWithId(this.idUser).subscribe((x:ModelUser)=>{
            this.usersData = x;
        }, (error:ErrorModel) => {
            console.log(error)
        })
        this.diagnosService.getPillsList().subscribe(x=>{
            this.pills = <PillsModel[]>x['content'];
        }, (error:ErrorModel) => {
            console.log(error)
        })
    }
    addDiagnosis($event){
        this.diagnosService.addDiagnosis(this.diagnosis.descriptionD,this.diagnosis.doctorId, this.diagnosis.nameD, this.diagnosis.patientId)
            .subscribe((x:DiagnosisModel)=>{
            let idDiagnosis = x.id;
            for (let treatmentCours of this.course) {
                let bodyTreatment={
                    "diagnosisId":idDiagnosis,
                    "medicamentsId": treatmentCours.medicaments.id,
                    "medicationSchedule": treatmentCours.medicationSchedule,
                    "supplementationMedicament": treatmentCours.supplementationMedicament,
                    "timeCourseEnd": treatmentCours.timeCourseEnd,
                    "timeCourseStart": treatmentCours.timeCourseStart
                }
                this.diagnosService.addTreatmentCourse(bodyTreatment)
            }
                this.router.navigate(['profile_user/'+this.idUser])
        }, (error:ErrorModel) => {
            console.log(error)
        });
    }

    cancel($event){
        this.router.navigate(['profile_user/'+this.idUser])
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
        if(this.isAddTreatment){
            this.newCourse.medicaments = this.pills[args.index];
            this.newCourse.medicamentsId = this.pills[args.index].id;
        }
        if(this.isEditTreatment){
            this.editCourse.medicaments=this.pills[args.index];
        }
        this.isShowListPills = false;
    }

    editScheduleTreatment(args:EventData){
        this.newCourse.medicationSchedule = (<TextField>args.object).text;
    }

    editDoseTreatment(args:EventData){
        this.newCourse.supplementationMedicament = (<TextField>args.object).text;
    }

    onDateStartChange(args:EventData){
        this.newCourse.timeCourseStart = (<DatePickerField>args.object).date.toISOString();
    }

    onDateEndChange(args:EventData){
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
        this.course = this.course.filter(value => value!=treatment);
    }

    hideEditListPills($event){
        this.isShowEditListPills = false;
    }

    updatePill(item:ItemEventData){
        this.editCourse.medicaments = this.pills[item.index];
        this.editCourse.medicamentsId = this.pills[item.index].id;
    }

    getObjDate(dateString:string){
        return new Date(dateString);
    }

    editTreatment($event){
        this.course[this.indexChange] = this.editCourse;
        this.isEditTreatment = false;
    }

    onEditDateStartChange(args:EventData){
        this.editCourse.timeCourseStart = (<DatePickerField>args.object).date.toISOString();
    }
    onEditDateEndChange(args:EventData){
        this.editCourse.timeCourseEnd = (<DatePickerField>args.object).date.toISOString();
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

}
