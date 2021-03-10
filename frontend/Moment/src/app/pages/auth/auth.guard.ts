import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { TokenStorageService } from "./token-storage.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
      if (!this.tokenStorage.getUser().pipe(map(user => {
        return !!user;
      }))) {
        this.router.navigateByUrl("/auth/login");
      }
      return this.tokenStorage.getUser().pipe(map(user => {
        return !!user;
      }));
    }
}