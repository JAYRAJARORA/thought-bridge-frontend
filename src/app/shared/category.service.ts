import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "./models/category.model";

@Injectable({ providedIn: "root" })
export class CategoryService {
    constructor(private http: HttpClient) {}

    categorySelected  = new EventEmitter<string>();
    
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('http://127.0.0.1:8080/categories');
    }

    
}