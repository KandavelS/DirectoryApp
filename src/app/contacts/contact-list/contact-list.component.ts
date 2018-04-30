import { Component, OnInit } from '@angular/core';
import { IContact } from '../contact';
import { ContactService } from '../contacts.service';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  pageTitle: String = '';
  errorMessage: String;
  contacts: IContact[] = [];

  filteredContacts: IContact[];
  _listFilter: string;

  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredContacts = this.listFilter ? this.performFilter(this.listFilter) : this.contacts;
  }

  performFilter(filterBy: string): IContact[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter((contact: IContact) =>
      contact.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private _contactService: ContactService) { }

  /**
   * load the contact list during init operation
   */
  ngOnInit() {
    this.contacts = this._contactService.getContacts();
  }
}
