import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Discussion } from "../shared/models/discussion.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { Comment } from "../shared/models/comment.model";
import { Upvote } from "../shared/models/upvote.model";

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

  getDiscussions(type: string, userId?: string): Observable<Discussion[]> {
    let param = userId ? '&userId=' + userId : '';
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions?type=${type}${param}`).pipe(tap((discussions: Discussion[]) => {
      this.discussions = discussions;
      this.discussionsChanged.emit(discussions);
    }));
  }

  getTrendingArticles(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/discussions/trending`).pipe(tap((discussions: Discussion[]) => {
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

  getCommentsForDiscussion(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/discussions/${id}/comments`);
  }

  addDiscussion(discussion: Discussion): void {
    if (!this.discussions) {
        this.discussions = [];
    }
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

  toggleUpvoteOnDiscussion(discussionId: string, userId: string) {
    return this.http.post<Discussion>(`${this.baseUrl}/discussions/${discussionId}/toggle-vote?userId=${userId}`, {});
  }

  checkIfUserHasUpvoted(discussionId: string, userId: string) {
    return this.http.post<Upvote>(`${this.baseUrl}/discussions/${discussionId}/check-vote?userId=${userId}`, {});
  }
}