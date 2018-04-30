import { Component, OnInit } from '@angular/core';
import { IContact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contacts.service';
import { DateFormatPipe } from '../../shared/date-format.pipe';

import * as moment from 'moment';

@Component({
  selector: 'pbk-contact-edit',
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit {

  public pageTitle: String = 'Edit Contact';
  public errorMessage: string;
  public contact: IContact;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService) {
  }

  /**
   * load the contact during component initialization
   */
  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getContact(String(id));
    }
  }

  /**
   *
   * @param id : string - id of the contact to be edited
   * It will fetch the contact details for the provided id
   */
  getContact(id: string): void {
    this.contact = this._contactService.getContact(id);
  }

  /**
   *
   * @param updatedContact - IContact
   * Invoke the service to update the contact
   */
  saveContact(updatedContact: IContact): void {
    this._contactService.editContact(this.contact.id, updatedContact);
  }

}
