import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatCardModule,CommonModule],
})
export class HomeComponent implements OnInit{
  constructor(public dialog: MatDialog) {}

  mainData:any[] =[]

  ngOnInit(): void {
    this.getLocalStorage();
  }
  openDialog(formdata:any): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '800px',
      data: formdata
    });
  }

  getLocalStorage() {
    const localStorageData = localStorage.getItem('mainData');
    this.mainData = localStorageData
      ? JSON.parse(localStorageData)
      : this.mainData;
  }
  
}
