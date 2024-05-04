import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Therapist } from "../shared/models/therapist.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Language } from "../shared/models/language.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.domain;
    }
  
    getProfile(userId: string, userType: string): Observable<Therapist> {
        return this.http.get<Therapist>(`${this.baseUrl}/users/${userId}?type=${userType}`);
    }

    updateProfile(userId: string, profileData: Therapist, userType: string): Observable<Therapist> {
      return this.http.put<Therapist>(`${this.baseUrl}/users/${userId}?type=${userType}`, profileData);
    }

    getLanguages() {
      return this.http.get<Language[]>(`${this.baseUrl}/users/languages`);
    }
  }