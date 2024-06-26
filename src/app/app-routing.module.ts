import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ResourcesComponent } from "./resources/resources.component";
import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DiscussionsComponent } from "./discussions/discussions.component";
import { DiscussionAddComponent } from "./discussions/discussion-add/discussion-add.component";
import { AuthGuard } from "./auth/auth.guard";
import { DiscussionDetailComponent } from "./discussions/discussion-detail/discussion-detail.component";
import { DiscussionStartComponent } from "./discussions/discussion-start/discussion-start.component";
import { CommentsComponent } from "./discussions/discussion-detail/comments/comments.component";
import { TherapistsComponent } from "./therapists/therapists.component";
import { ProfileComponent } from "./profile/profile.component";
import { TherapistDetailComponent } from "./therapists/therapist-detail/therapist-detail.component";
import { ReviewsListComponent } from "./therapists/reviews/reviews-list/reviews-list.component";
import { UrgentHelpComponent } from "./urgent-help/urgent-help.component";
import { AboutComponent } from "./about/about.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'issues', component: DiscussionsComponent, canActivate: [AuthGuard], data: { type: 'issues' }, children: [
            { path: '', component: DiscussionStartComponent, data: { type: 'issue' } },
            { path: 'new', component: DiscussionAddComponent },
            {
                path: ':id', component: DiscussionDetailComponent, data: { type: 'issue' }, children: [
                    { path: 'comments', component: CommentsComponent }
                ]
            }
        ]
    },
    {
        path: 'articles', component: DiscussionsComponent, canActivate: [AuthGuard], data: { type: 'articles' }, children: [
            { path: '', component: DiscussionStartComponent, data: { type: 'article' } },
            { path: 'new', component: DiscussionAddComponent },
            {
                path: ':id', component: DiscussionDetailComponent, data: { type: 'article' }, children: [
                    { path: 'comments', component: CommentsComponent }
                ]
            }
        ]
    },
    { path: 'therapists', component: TherapistsComponent, canActivate: [AuthGuard] },
    {
        path: 'therapists/:id', component: TherapistDetailComponent, canActivate: [AuthGuard], children: [
            {
                path: 'reviews',
                component: ReviewsListComponent
            }
        ]
    },
    { path: 'users/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'resources', component: ResourcesComponent },
    { path: 'urgent-help', component: UrgentHelpComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'error-page', component: ErrorPageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'error-page' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }