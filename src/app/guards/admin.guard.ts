import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // tslint:disable-next-line: curly
      if (localStorage.getItem('admin')) return true;
      else {
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'You must be logged in as an administrator to access',
          showConfirmButton: false,
          icon: 'info',
          timer: 4000
        });
        return false;
      }
  }

}
