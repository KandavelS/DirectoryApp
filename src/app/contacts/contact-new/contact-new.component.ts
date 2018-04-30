import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IContact } from '../contact';
import { Router } from '@angular/router';
import { ContactService } from '../contacts.service';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';

@Component({
  selector: 'pbk-contact-new',
  templateUrl: './contact-new.component.html'
})
export class ContactNewComponent implements OnInit {
  pageTitle: String = 'New Contact';
  contact: IContact = {
    id: uuid(),
    name: null,
    phone: null,
    email: '',
    birthday: moment().toDate(),
    avatar: null
  };
  constructor(private _contactService: ContactService, private _router: Router) { }

  ngOnInit() {
  }

  saveContact(newContact: IContact): void {
    this._contactService.saveContact(newContact);
    this._router.navigate(['contacts']);
  }
}
