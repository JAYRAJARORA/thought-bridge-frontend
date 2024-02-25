import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../shared/models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    register(user: User) {
        return this.http.post<any>('http://127.0.0.1:8080/users', user);
    }

    login(user: User) {
        return this.http.post<any>('http://127.0.0.1:8080/users/login', user);
    }
}