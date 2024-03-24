import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../shared/models/user.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { LoginResponse } from "../shared/models/login.response";

@Injectable({ providedIn: 'root' })
export class AuthService {
    userLoggedIn = new BehaviorSubject<{username: string, authenticated: boolean, type: string}>(null);
    private tokenExpirationTimer: any;
    private baseUrl: string;
    

    constructor(private http: HttpClient, private router: Router) {
        this.baseUrl = environment.domain;
    }

    register(user: User, resource: string) {
        return this.http.post(`${this.baseUrl}/${resource}`, user, {
            observe: 'response',
            responseType: 'text'
        });
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData) { 
            return;
        }
        this.userLoggedIn.next(userData);
        //this.autoLogout(1000000);
    }
    
    login(user: User, type: string) {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login?type=${type}`, user);
    }

    logout() {
        this.userLoggedIn.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
 }