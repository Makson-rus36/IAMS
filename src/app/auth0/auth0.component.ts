import { Component, OnInit } from "@angular/core";
import {Auth0, Credentials, UserInfo, WebAuthException} from 'nativescript-auth0';
import {Utils} from '@nativescript/core';
import {AuthService} from '@src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./auth0.component.html"
})
export class Auth0Component implements OnInit {
    private auth0: Auth0;
    _message: string;
    _info: string;

    constructor(private httpService: AuthService ) {
        // Use the component constructor to inject providers.
        this.auth0 = new Auth0('rdrJ4BW48F6Ner00J1D9tN8nhaOcOv8f', 'hsn-authorize.eu.auth0.com');
    }

    ngOnInit(): void {
        //Utils.openUrl("https://chf-back.herokuapp.com/login")
        // Init your component properties here.
        /*this.httpService.checkAuth().subscribe(x=>{
            this._message = <string>x;
        })*/

    }

    get message(): string {
        return this._message;
    }

    login() {
        //Utils.openUrl("https://chf-back.herokuapp.com/login");
        console.log("sal")
        this.auth0.webAuthentication({
            scope: 'openid profile email'
        }).then((result: Credentials) => {
            var appSettings = require("application-settings");
            console.log(result)
            appSettings.setString("access_token", result.accessToken);
            this._message = result.accessToken ;
            console.log(result);
        }).catch((error: Error | WebAuthException) => {
            this._message = JSON.stringify(error, null, '  ');
            console.log(error.stack);
        });
    }
    logout(){
        var appSettings = require("application-settings");
       /* const url = `https://hsn-authorize.eu.auth0.com/v2/logout?client_id=rdrJ4BW48F6Ner00J1D9tN8nhaOcOv8f&returnTo=https://hsn-authorize.eu.auth0.com/android/org.nativescript.iams/callback`;
        Utils.openUrl("https://chf-back.herokuapp.com/logout");*/
       /* this.auth0.getUserInfo(appSettings.getString("access_token")).then((res:UserInfo)=>{
            this._info = res.email;
        })*/
        this.auth0.revokeRefreshToken(appSettings.getString("access_token"));
    }
}
