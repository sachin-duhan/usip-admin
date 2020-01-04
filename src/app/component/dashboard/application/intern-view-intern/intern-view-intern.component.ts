import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RegisterService } from '../../../../service/register.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intern-view-intern',
  templateUrl: './intern-view-intern.component.html',
  styleUrls: ['./intern-view-intern.component.css']
})
export class InternViewInternComponent implements OnInit {

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _register: RegisterService,
    private _toast: ToastrService,
    public dialogRef: MatDialogRef<InternViewInternComponent>) { }

  internForm = this.fb.group({
    comment: [this.data.internview_comment],
    marks: [this.data.internview_marks, Validators.max(100)],
    isSelected: [this.data.isSelected],
    interview_attendence:[this.data.interview_attendence]
  });
  private loading: Boolean = false;
  public applicant = this.data;
  ngOnInit() {}

  submitForm(): void {
    this.loading = !this.loading;
    const user = {
      isSelected: this.internForm.get('isSelected').value,
      comment: this.internForm.get('comment').value,
      interview: true,
      marks: this.internForm.get('marks').value,
      interview_attendence:this.internForm.get('interview_attendence').value
    };
    this._register.selectIntern(user, this.applicant._id)
      .subscribe(
        res => {
          console.log(res);
          if (res.message === 'intern updated!') {
            window.localStorage.setItem('interview', 'ok');
          } else {
            window.localStorage.removeItem('interview');
            window.localStorage.setItem('interview', 'failed');
          }
          this.loading = !this.loading;
          this.dialogRef.close();
        }, err => {
          console.log(err);
          this._toast.error('Contact Developer!!', 'BUG!');
          window.localStorage.setItem('interview', 'failed');
          this.loading = !this.loading;
          this.dialogRef.close();
        }
      );
  }
  close():void {
    this.dialogRef.close();
  }
}
