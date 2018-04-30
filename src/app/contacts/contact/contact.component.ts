import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../contact';

@Component({
  selector: 'pbk-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact: IContact;

  constructor() { }

  ngOnInit() {
  }

}
