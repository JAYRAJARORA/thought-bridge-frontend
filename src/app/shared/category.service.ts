import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { Category } from "./models/category.model";
import { environment } from "../../environments/environment";
import { Discussion } from "./models/discussion.model";

@Injectable({ providedIn: "root" })
export class CategoryService {
    private baseUrl: string;
    public categories = [];
    constructor(private http: HttpClient) {
        this.baseUrl = environment.domain
    }

    categorySelected  = new EventEmitter<string[]>();
    
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/categories`).pipe(tap((categories) => {
            this.categories = categories;
        }));
    }

    getDiscussionsByCategory(categoryIds: string[]): Observable<Discussion[]> {
        const categoryIdsString = categoryIds.join(',');
        return this.http.get<Discussion[]>(`${this.baseUrl}/categories/articles?categoryIds=${categoryIdsString}`);
      }
    
}