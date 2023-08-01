import { Component, HostListener, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import {NgFor} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common'; // Import CommonModule here


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  standalone: true,
  imports: [MatDividerModule,CommonModule,CdkDropList, NgFor, CdkDrag,MatIconModule,
    MatCardModule,MatRadioModule,MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,
    MatCheckboxModule,MatDatepickerModule,MatButtonModule]
})
export class FormsComponent implements OnInit {

  constructor(private router: Router) { }

  
 
  objectArray: any[] = [];
  localStorageData: any[] = [];
  lastUsedId: number = 0;
  inputValue: string = '';
  selectedCard = false;
  selectedCardId = '';

  ngOnInit(): void {
    this.setLocalStorage();
  }

  

  addLabelData() {
    this.objectArray.forEach(item => {
      if(item.id === this.selectedCardId) {
        item.labelName = this.inputValue
      }
    })
    // console.log(this.objectArray);
  }

  createAndPushObject(input:any) {
    this.addLabelData();
    this.inputValue = '';
    this.lastUsedId++;

    const newObject = {
      id: this.lastUsedId,
      category: input,
      labelName: '',
      selected: false,
      validation: false
    };

    // Push the newly created object into the array
    this.objectArray.push(newObject);
    console.log('New object added to the array:', newObject);
    console.log('Updated array:', this.objectArray);
  }

  checkSelectedForm(data:any) {
    this.addLabelData();
    this.objectArray.forEach(obj => {
      if (obj !== data.selected) {
        obj.selected = false;
      }
    });
    
    // Toggle the selected property for the clicked card
    data.selected= !data.selected;
    this.checkLabelcard();
    this.inputValue = '';
  }

  removeItem(id: number): void {
    this.objectArray = this.objectArray.filter(obj => obj.id !== id);
  }

  checkLabelcard() {
    this.objectArray.forEach( item => {
      if(item.selected) {
        this.selectedCard = true;
        this.selectedCardId = item.id;
      }
    })
  }

  onClickAnywhere(event: MouseEvent) {
    this.addLabelData();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.onClickAnywhere(event);
  }

  goToHome($myParam: string = ''): void {
    const navigationDetails: string[] = ['home'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  setLocalStorage() {
    const existingLocalData = localStorage.getItem('mainData');
    this.localStorageData  = existingLocalData ? JSON.parse(existingLocalData) : this.localStorageData;
  }

  saveGoToHome($myParam: string = ''): void {
    this.localStorageData.push(this.objectArray);
    localStorage.setItem('mainData', JSON.stringify(this.localStorageData));
    const navigationDetails: string[] = ['home'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }


}
