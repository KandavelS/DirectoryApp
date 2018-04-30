import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as moment from 'moment';

import { IContact } from './contact';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Router } from '@angular/router';

@Injectable()
export class ContactService {
    errorMessage: any;
    private _contactUrl = '../../api/contacts/seed.json';
    private _contacts: IContact[];
    constructor(private _http: HttpClient, private _localStorageService: LocalStorageService, private _router: Router) { }

    /**
     * @returns Observable - Array of IContacts Observable
     * Load the data from seed.json if the local storage not available
     * else load list from localstorage
     */
    getInitialData(): Observable<IContact[]> {
        if ( !this._localStorageService.retrieve('contactList') ) {
        return this._http.get<IContact[]>(this._contactUrl)
            .do((data) => {
                console.log('All: ' + JSON.stringify(data));
                for (let contact of data) {
                    console.log(contact);
                    contact.birthday = moment(contact.birthday, "MM/DD/YYYY").toDate();
                }
                this._localStorageService.store('contactList', data);
            })
            .catch(this.handleError);
        } else {
            return Observable.of(<IContact[]>this._localStorageService.retrieve('contactList'));
        }
    }

    /**
     * Callback method to load the contacts array during initialization.
     */
    loadContacts(): void {
        this.getInitialData()
        .subscribe(contacts => {
            this._contacts = contacts;
        },
            error => this.errorMessage = <any>error);
    }

    /**
     * @returns IContact[]
     * util method to return the contacts list
     */
    getContacts(): IContact[] {
      return this._contacts;
    }
    /**
     *
     * @param id - string - contact id
     * util method to find if the requested contact is valid.
     */
    isValidContact(id: string): boolean {
        const filteredContacts: IContact[] = this.getContacts().filter(contact => contact.id == id);
        return filteredContacts.length > 0 ? true : false;
    }

    /**
     *
     * @param id - string.
     * Retrieves the contact detail for the given id
     */
    getContact(id: string): IContact {
        const filteredContacts: IContact[] = this.getContacts().filter(contact => contact.id == id);
        return filteredContacts[0];
    }
    /**
     *
     * @param id - string
     * Retrieves contact index for the provided id
     */
    getContactIndex(id: string): number {
        return this.getContacts().findIndex(contact => contact.id == id);
    }

    /**
     *
     * @param contactId - string
     * @param updateContact - IContact
     * updates the existing contact and updates the loacl storage
     */
    editContact(contactId: string, updateContact: IContact): void {
        if ( updateContact ) {
            const index = this.getContactIndex(contactId);
            if (index > -1) {
                this._contacts[index] = updateContact;
                this._localStorageService.store('contactList', this.getContacts());
            } else {
                console.log('Update Contact failed');
            }
        }
        this._router.navigate(['contacts']);
    }

    /**
     *
     * @param newContact - IContact
     * Creates a new contact and updates the local storage.
     */
    saveContact(newContact: IContact): void {
       if ( newContact ) {
        this.getContacts().push(newContact);
        this._localStorageService.store('contactList', this.getContacts());
       }
       this._router.navigate(['contacts']);
    }

    /**
     *
     * @param err - HttpErrorResponse
     * Error Handler method
     */
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
