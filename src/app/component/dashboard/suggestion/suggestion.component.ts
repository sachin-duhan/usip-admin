import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { InternService } from '../../../service/intern.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  constructor(private _internService : InternService,private _toast:ToastrService) { }

  bugs = [];
  ngOnInit() {
    this._internService.get_improvement().subscribe(res => {
      this.bugs = res.bugs;
    }, err => {
      console.log(err);
    });
  }
  delete(id):void{
    this._internService.delete_improvement(id).subscribe(res=>{
      document.getElementById(id).classList.add('hide');
      this._toast.success(res.message,'Done');
    },err=>{
      this._toast.error(err.error.message,'Not Done');
    })
    console.log(id);
  }
}
