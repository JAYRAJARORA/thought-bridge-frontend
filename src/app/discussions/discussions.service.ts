import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Discussion } from "../shared/models/discussion.model";
import { BehaviorSubject, Observable, of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { Comment } from "../shared/models/comment.model";

@Injectable({ providedIn: "root" })
export class DiscussionService {
  private baseUrl: string;
  discussionsChanged = new EventEmitter<Discussion[]>();
  commentAdded = new EventEmitter<void>();
  selectedDiscussion = new BehaviorSubject<Discussion>(null);
  
  discussions : Discussion[] = [];

  constructor(private http: HttpClient) {
    this.baseUrl = environment.domain;
  }

  getDiscussionsByCategory(categoryName: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/categories/${categoryName}`);
  }

  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions`).pipe(tap((discussions: Discussion[]) => {
      this.discussions = discussions;
      this.discussionsChanged.emit(discussions);
    }));
  }

  createDiscussion(discussion): Observable<any> {
    return this.http.post<Discussion>(`${this.baseUrl}/discussions`, discussion);
  }

  addCommentToDiscussion(id: string, comment: Comment): Observable<Discussion> {
    return this.http.post<Discussion>(`${this.baseUrl}/discussions/${id}/comments`, comment);
  }

  addDiscussion(discussion: Discussion): void {
    this.discussions.push(discussion);
    this.discussionsChanged.emit(this.discussions.slice());
  }

  findDiscussionById(id: string): Observable<Discussion> {
    if (this.discussions.length === 0) {
      
      return this.getDiscussions().pipe(
        switchMap(() => this.findDiscussionById(id))
      );
    }

    const discussion = this.discussions.find(d => d.id === id);
    
    this.selectedDiscussion.next(discussion);
    return of(discussion);
  }
}