import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from './../contact';
import { ContactService } from './../contacts.service';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  pageTitle: String = 'Contact Detail';
  errorMessage: string;
  contact: IContact;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getContact(String(id));
    }
  }

  getContact(id: string) {
    this.contact = this._contactService.getContact(id);
  }

  onBack(): void {
    this._router.navigate(['/contacts']);
  }

}
