import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { MatBottomSheetRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})

// export class application  {
//   isOpen: Boolean;
//   end: Date;
//   start: Date;
// }

export class NewApplicationComponent implements OnInit {

  constructor(private _resgisterService: RegisterService,
    private _toast: ToastrService,
    public sheetRef: MatBottomSheetRef<NewApplicationComponent>) { }

  public application: ApplicationInternface;
  public domains = [];
  public loading: Boolean = false;
  public form: Boolean = false;

  showForm(): void {
    this.form = !this.form;
  }

  ngOnInit() {
    this.loading = !this.loading;
    this._resgisterService.applicationStatus('application').subscribe(
      res => {
        const l = res.status.length;
        this.application = res.status[l - 1];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    // get all domain
    this._resgisterService.getDomain().subscribe(
      res => {
        this.domains = res.domain;
        //console.log(res);
        this.loading = !this.loading;
      }, err => {
        console.log(err);
        this.loading = !this.loading;
      }
    );
  }
  closeApplication(id): void {
    const data = {
      id: id
    };
    this._resgisterService.CloseApplication(data, 'application').subscribe(
      res => {
        console.log(res);
        this._toast.success(res.message, 'Done');
        this.sheetRef.dismiss();
      }, err => {
        console.log(err);
        this._toast.error(err.message, err.statusText);
      }
    );
  }
  openApplication(date): void {
    if (date) {
      const data = {
        end: date
      };
      this._resgisterService.OpenApplication(data, 'application').subscribe(res => {
        console.log(res);
        if (res.message === 'application opened!') {
          this._toast.success(res.message, 'Successful');
          this.sheetRef.dismiss();
        } else {
          this._toast.error('cant open application', 'BAD request');
        }
      }, err => {
        console.log(err);
        this._toast.error('cant open application', 'BAD request');
      });
    } else {
      this._toast.error('You cant open application wihtout an end Date', 'Date required');
    }
  }
  addDomain(data): void {
    const newDomain = {
      title: data
    };
    this._resgisterService.createDomain(newDomain).subscribe(res => {
      if (res.message === 'Domain added!') {
        this._toast.success(res.message, 'Congratulations');
      } else if (res.message === 'Domain already found') {
        this._toast.warning(res.message, 'Not created');
      }
    }, err => {
      console.log(err);
      this._toast.error('Domain cant be resgistered', 'BAD Request');
    });
  }
  deleteDomain(id): void {
    this._resgisterService.deleteDomain(id).subscribe(res => {
      if (res.message === 'Domain Deleted') {
        this._toast.success(res.message, 'OK!');
        document.getElementById(id).classList.add('hide');
      } else {
        this._toast.error('Cant delete the domain', 'BAD request');
      }
    }, err => {
      this._toast.error('Cant delete the domain', 'BAD request');
      console.log(err);
    });
  }

}
export class ApplicationInternface {
  isOpen: Boolean;
  _id: String;
  start: Date;
  end: Date;
}