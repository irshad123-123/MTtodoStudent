import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IstdArr } from '../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @ViewChild('fname') fnameRef !: ElementRef
  @ViewChild('lname') lnameRef !: ElementRef
  @ViewChild('email') emailRef !: ElementRef
  @ViewChild('contact') contactRef !: ElementRef
  constructor(private _matSnackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  snack(msg : string){
    this._matSnackBar.open(msg,'close',{
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'left'
    })
  }

  isEditMode: boolean = false

  stdArr: Array<IstdArr> = [
    {
      fname: 'Jhon',
      lname: 'Doe',
      email: 'jhon@gmail.com',
      contact: 1234567890,
      stdId: '123'
    },
    {
      fname: 'May',
      lname: 'Doe',
      email: 'may@gmail.com',
      contact: 1234567890,
      stdId: '124'
    },
    {
      fname: 'June',
      lname: 'Doe',
      email: 'june@gmail.com',
      contact: 1234567890,
      stdId: '125'
    }
  ]

  Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

  onAddStd() {
    let stdObj = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      stdId: this.Uuid()
    }
    this.stdArr.push(stdObj)
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.snack('The new student details added successfully !!!')
  }
  onEditStd(std: IstdArr) {
    let Edit_Id = std.stdId
    localStorage.setItem('Edit_Id', Edit_Id)
    this.fnameRef.nativeElement.value = std.fname
    this.lnameRef.nativeElement.value = std.lname
    this.emailRef.nativeElement.value = std.email
    this.contactRef.nativeElement.value = std.contact
    this.isEditMode = true
  }
  onUpdateStd(){
    let Update_Id = localStorage.getItem('Edit_Id')!
    let Update_Obj = {
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      stdId: Update_Id
    }
    let getIndex = this.stdArr.findIndex(i=>i.stdId === Update_Id)
    this.stdArr[getIndex] = Update_Obj
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.isEditMode = false
    this.snack('The student details updated successfully !!!')
  }
  onRemoveStd(std : IstdArr){
    let isConfirm = confirm('Are you sure want to remove this student details !!!')
    if(isConfirm){
      let Remove_Id = localStorage.getItem('Edit_Id')
    let getIndex = this.stdArr.findIndex(t=>t.stdId === Remove_Id)
    this.stdArr.splice(getIndex, 1)
    this.snack('The student details removed successfully !!!')
    }
  }


}
