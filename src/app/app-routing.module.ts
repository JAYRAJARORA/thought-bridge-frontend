import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ArticlesComponent } from "./articles/articles.component";
import { FindTherapistComponent } from "./find-therapist/find-therapist.component";
import { ResourcesComponent } from "./resources/resources.component";
import { NgModule } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DiscussionsComponent } from "./discussions/discussions.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'discussions', component: DiscussionsComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'find-therapists', component: FindTherapistComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'error-page', component: ErrorPageComponent },
    { path: '**', redirectTo: 'error-page'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}