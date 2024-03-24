import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Discussion } from "../shared/models/discussion.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { Comment } from "../shared/models/comment.model";
import { Therapist } from "../shared/models/therapist.model";

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

  getDiscussionsByCategory(categoryIds: string[]): Observable<Discussion[]> {
    const categoryIdsString = categoryIds.join(',');
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions-by-category?categoryIds=${categoryIdsString}`);
  }

  getDiscussions(type: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions?type=${type}`).pipe(tap((discussions: Discussion[]) => {
      this.discussions = discussions;
      this.discussionsChanged.emit(discussions);
    }));
  }

  getTrendingArticles(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/trending-articles`).pipe(tap((discussions: Discussion[]) => {
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
    return this.http.get<Discussion>(`${this.baseUrl}/discussions/${id}`).pipe(
      tap((discussion: Discussion) => {
        this.selectedDiscussion.next(discussion);
      })
    );
  }


  getTherapists() {
    return this.http.get<Therapist[]>(`${this.baseUrl}/therapists`);
  }

  toggleUpvoteOnDiscussion(discussionId: string, username: string) {
    return this.http.post<Discussion>(`${this.baseUrl}/discussions/${discussionId}/toggle-upvote?username=${username}`, {});
  }
}