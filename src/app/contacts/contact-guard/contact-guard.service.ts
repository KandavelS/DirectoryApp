import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ContactService } from '../contacts.service';

@Injectable()
export class ContactGuardService implements CanActivate {

  constructor(private _router: Router, private _contactService: ContactService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = route.url[1].path;
    if ( !this._contactService.isValidContact(String(id)) ) {
      alert('Invalid contact Id');
      this._router.navigate(['/contacts']);
      return false;
    }
    return true;
  }
}
