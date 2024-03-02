import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard  implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Observable<boolean | UrlTree> | Promise<boolean> {
        return this.authService.userLoggedIn.pipe(
            take(1),
        map(userData => {    
            if (!userData || !userData.authenticated) {
                return this.router.createUrlTree(['/login']);
            } else { 
                return true;
            }
        }));
    }   
}