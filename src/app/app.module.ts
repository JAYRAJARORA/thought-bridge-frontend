import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { DiscussionListTrendingComponent } from './discussions/discussion-list-trending/discussion-list-trending.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { ResourcesComponent } from './resources/resources.component';
import { FindTherapistComponent } from './find-therapist/find-therapist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CategoryComponent } from './category/category.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { DiscussionAddComponent } from './discussions/discussion-add/discussion-add.component';
import { DiscussionsListComponent } from './discussions/discussions-list/discussions-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DiscussionItemComponent } from './discussions/discussion-item/discussion-item.component';
import { DiscussionDetailComponent } from './discussions/discussion-detail/discussion-detail.component';
import { DiscussionStartComponent } from './discussions/discussion-start/discussion-start.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommentsComponent } from './discussions/discussion-detail/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscussionsComponent,
    DiscussionListTrendingComponent,
    ArticlesComponent,
    HomeComponent,
    ResourcesComponent,
    FindTherapistComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    DiscussionAddComponent,
    DiscussionsListComponent,
    DropdownDirective,
    DiscussionItemComponent,
    DiscussionDetailComponent,
    DiscussionStartComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
