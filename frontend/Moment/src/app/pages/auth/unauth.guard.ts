import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class UnAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
      if (this.authService.getToken()) {
        this.router.navigateByUrl("/tasks");
        return false;
      }
      // return this.authService.getUser();
      return true;
    }
}