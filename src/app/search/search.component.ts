import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';
import {SearchUsersService} from '@src/app/services/search.users.service';
import {Search_usersModel} from '@src/app/models/search_users.model';
import {ErrorModel} from '@src/app/models/error.model';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
    filterUsersList:Search_usersModel[]=[];
    allUsersList:Search_usersModel[]=[];


     constructor(private page:Page, private router:Router, private searchUsersService: SearchUsersService) {
     }

     ngOnInit() {
         this.page.actionBarHidden=true;
         this.searchUsersService.searchUsers().subscribe((x)=>{
             this.allUsersList = (<Search_usersModel[]>x['content']).filter(x=>{
                 return x.accessType == 'PATIENT';
             });
         }, (error:ErrorModel) => {
             console.log(error)
         })
     }

    goProfile(id){
         this.router.navigate(['profile_user/'+id])
    }

    goToHome($event){
         this.router.navigate(['home'])
    }
}
