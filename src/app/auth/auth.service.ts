import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../shared/models/user.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.domain;
    }

    register(user: User) {
        return this.http.post<any>(`${this.baseUrl}/users`, user);
    }

    login(user: User) {
        return this.http.post<any>(`${this.baseUrl}/login`, user);
    }
}