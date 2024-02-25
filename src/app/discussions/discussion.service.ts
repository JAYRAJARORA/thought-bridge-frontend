import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Discussion } from "../shared/models/discussion.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DiscussionService {
    constructor(private http: HttpClient) {}

    getDiscussionsByCategory(categoryName: string): Observable<Discussion[]> {
        return this.http.get<Discussion[]>(`http://127.0.0.1:8080/categories/${categoryName}`);
      }
}