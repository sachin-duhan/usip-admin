import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import {RegisterService} from '../../../../service/register.service';


import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intern-modal',
  templateUrl: './intern-modal.component.html',
  styleUrls: ['./intern-modal.component.css']
})
export class InternModalComponent implements OnInit {
  private loading = false;
  public intern:any;
  constructor( @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private _registerService: RegisterService,
              private toast: ToastrService) { }

  ngOnInit() {
    this.loading = !this.loading;
    this._registerService.getSpecificIntern(this.data.intern.pInfo).subscribe(
      res => {
        console.log(res);
        this.intern = res.applicant;
      },
      err => {
        if(err.status === 400){
          this.toast.error('No Intern found for this report', 'BAD Request');
        }else {
          this.toast.error('Contact Developer', 'BAD Request');
        }
      }
    );
    this.loading = !this.loading;
  }

}
