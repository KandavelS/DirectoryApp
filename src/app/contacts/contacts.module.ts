import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { SharedModule } from './../shared/shared.module';
import { ContactGuardService } from './contact-guard/contact-guard.service';
import { ContactService } from './contacts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactComponent } from './contact/contact.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

@NgModule({
  imports: [
   CommonModule,
   FormsModule,
    RouterModule.forChild([
      { path: 'contacts', component: ContactListComponent },
      { path: 'contacts/:id',
          canActivate: [ ContactGuardService ],
          component: ContactDetailComponent },
      {path: 'create', component: ContactNewComponent },
      {path: 'edit/:id', canActivate: [ ContactGuardService ],
          component: ContactEditComponent },
  ]),
  SharedModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    ContactNewComponent,
    ContactComponent,
    ContactEditComponent
  ],
  providers: [
    ContactService,
    ContactGuardService,
    ContactListComponent
  ]
})
export class ContactsModule { }
