import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issues: string[] = ['ADHD', 'Depression', 'Anxiety']; // Example issues
  trendingPosts: any[] = []; // Placeholder for trending posts
  articles: any[] = []; // Placeholder for articles

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Fetch trending posts and articles for default issue
    this.showTrendingPosts(this.issues[0]);
  }

  showTrendingPosts(issue: string): void {
    this.trendingPosts = [{ title: 'Post 1', author: 'Author 1' }, { title: 'Post 2', author: 'Author 2' }];
    this.articles = [{ title: 'Article 1', author: 'Author 1' }, { title: 'Article 2', author: 'Author 2' }];
  }

  redirectToLogin(): void {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
