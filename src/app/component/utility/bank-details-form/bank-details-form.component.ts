import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
    
  ngOnInit() {}

}
