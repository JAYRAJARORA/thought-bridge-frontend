import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Discussion } from "../shared/models/discussion.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class DiscussionService {
  private baseUrl: string;
  private discussions: Discussion[] = [];

  constructor(private http: HttpClient) {
    this.baseUrl = environment.domain;
  }

  getDiscussionsByCategory(categoryName: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/categories/${categoryName}`);
  }

  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions`);
  }

  createDiscussion(discussion): Observable<any> {
    return this.http.post(`${this.baseUrl}/discussions`, discussion);
  }

  setDiscussions(discussions: Discussion[]): void {
    this.discussions = discussions;
  }

  getStoredDiscussions(): Discussion[] {
    return this.discussions;
  }

  addDiscussion(discussion: Discussion): void {
    this.discussions.push(discussion);
  }
}