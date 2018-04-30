import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { IContact } from './contact';
import { ContactListComponent } from './contact-list/contact-list.component';

@Injectable()
export class ContactService {
    errorMessage: any;
    private _contactUrl = '../../api/contacts/seed.json';
    private _contacts: IContact[];
    constructor(private _http: HttpClient, private _localStorageService: LocalStorageService) { }

    getInitialData(): Observable<IContact[]> {
        // return this._http.get<IContact[]>(this._contactUrl)
        //     .do(data => console.log('All: ' + JSON.stringify(data)))
        //     .catch(this.handleError);
        if ( !this._localStorageService.retrieve('contactList') ) {
        return this._http.get<IContact[]>(this._contactUrl)
            .do((data) => {
                console.log('All: ' + JSON.stringify(data));
                this._localStorageService.store('contactList', data);
            })
            .catch(this.handleError);
        } else {
            return Observable.of(<IContact[]>this._localStorageService.retrieve('contactList'));
        }
    }

    loadContacts(): void {
        this.getInitialData()
        .subscribe(contacts => {
            this._contacts = contacts;
        },
            error => this.errorMessage = <any>error);
    }

    getContacts(): IContact[] {
      return this._contacts;
    }

    isValidContact(id: string): boolean {
        const filteredContacts: IContact[] = this.getContacts().filter(contact => contact.id == id);
        return filteredContacts.length > 0 ? true : false;
    }

    getContact(id: string): IContact {
        const filteredContacts: IContact[] = this.getContacts().filter(contact => contact.id == id);
        return filteredContacts[0];
    }

    saveContact(newContact: IContact): void {
       if ( newContact ) {
        this.getContacts().push(newContact);
        this._localStorageService.store('contactList', this.getContacts());
       }

    }

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
