import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit{

  inputValue: any;

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    {
      this.inputValue = data;
    }
  }
  ngOnInit(): void {
    // console.log(this.inputValue);
  }


}
