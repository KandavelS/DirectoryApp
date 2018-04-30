import { Component, OnInit } from '@angular/core';
import { IContact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'pbk-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  public pageTitle: String = 'Contact Detail';
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
  //  this.contact.birthday = new Date( this.contact.birthday );
  }

}
