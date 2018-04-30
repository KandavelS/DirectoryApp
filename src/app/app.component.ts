import { Component, OnInit } from '@angular/core';
import { ContactService } from './contacts/contacts.service';

@Component({
  selector: 'pbk-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  pageTitle: String = 'ACME Directory';

  constructor(private _contactService: ContactService) {}

  ngOnInit() {
    this._contactService.loadContacts();
  }
}
