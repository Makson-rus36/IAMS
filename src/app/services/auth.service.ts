import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpClient) {
    }

    checkAuth(){
        return this.httpService.get("https://chf-back.herokuapp.com/api/access-types");
    }

    logout(){
        return this.httpService.get("https://chf-back.herokuapp.com/logout");
    }
}

