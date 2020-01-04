import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { InternService } from '../../../service/intern.service';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from '../../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class AccessComponent implements OnInit {

  private showDeleteButton:Boolean = false;
  constructor(
    private _internService: InternService,
    private _toast: ToastrService,
    private _login: LoginService
  ) { }
  dataSource2 = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns2: string[] = ['depNo', 'name', 'rollNo', 'officer', 'end', 'update'];
  public intern = [];
  ngOnInit() {
    this.dataSource2.sort = this.sort;
    this._internService.showRegisterIntern().subscribe(
      res =>{ this.dataSource2 = res.interns },
      err => {
        console.log(err);
        this._toast.error(err.message, 'Something went wrong!');
      }
    );
  }
  // making login credentials
  allowAccess(data){
    const intern = {
      userName : data.pInfo.email,
      adminAccessGiven:false,
      password:data._id,
      userDetails:data._id
    }
    console.log(data);
    this._login.makeLoginCredentials(intern).subscribe(res=>{
      this._toast.success('Login credentials given to given!','Sucsess');
    },err=>{
      this._toast.error(err.error.message,'Failed');
      console.log(err);
    });
  }

  deleteIntern(data){
    this._login.deleteIntern(data).subscribe(res=>{
      console.log(res);
      this._toast.success( res.messgae ,'Success');
    },err=>{
      this._toast.error(err.error.messgae,'Failed');
      console.log(err);
    });
  }

  toggle():void {
    this.showDeleteButton = !this.showDeleteButton;
  }
}
