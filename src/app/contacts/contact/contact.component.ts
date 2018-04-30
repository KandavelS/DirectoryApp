import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../contact';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ContactService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pbk-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  @Input() contact: IContact;
  @Input() pageTitle: String;
  @Output() saveContact: EventEmitter<IContact> = new EventEmitter<IContact>();
  constructor(private _contactService: ContactService, private _router: Router) { }

  ngOnInit() {
  }

  saveAction(): void {
    this.saveContact.emit(this.contact);
  }

  cancelAction(): void {
    this._router.navigate(['contacts']);
  }
}
