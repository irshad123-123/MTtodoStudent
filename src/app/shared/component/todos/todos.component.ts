import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { flatMap } from 'rxjs';
import { ItodoArr } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  isEditMode : boolean = false;
  constructor(private _matSnackBar : MatSnackBar) { }
  mst(msg : string){
    this._matSnackBar.open(msg,'close',{
      duration : 3000,
      verticalPosition: 'top',
      horizontalPosition : 'left'
    })
  }
  ngOnInit(): void {
  }
  @ViewChild('onTodo') todoRef ! : ElementRef
  todoArr : Array<ItodoArr> =[
    {
      todoItem : 'HTML',
      todoId : '123'
    },
    {
      todoItem : 'CSS',
      todoId : '124'
    },
    {
      todoItem : 'Javascript',
      todoId : '125'
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

  onAddTodo(){
    let obj = {
      todoItem : this.todoRef.nativeElement.value,
      todoId : this.Uuid()
    }
    this.todoRef.nativeElement.value = ''
    this.todoArr.unshift(obj)
    this.mst('The new todoItem is added Successfully !!!')
  }

  onEditTodo(todo : ItodoArr){
    let Edit_Id = todo.todoId
    localStorage.setItem('Edit_Id', Edit_Id)
    this.todoRef.nativeElement.value = todo.todoItem
    this.isEditMode = true
  }
  onUpdateTodo(){
    let Update_Id = localStorage.getItem('Edit_Id')!
    localStorage.removeItem('Edit_Id')
    let Update_Obj = {
      todoItem : this.todoRef.nativeElement.value,
      todoId : Update_Id
    }
    let getIndex = this.todoArr.findIndex(t=>t.todoId === Update_Id)
    this.todoArr[getIndex] = Update_Obj
    this.isEditMode = false;
    this.todoRef.nativeElement.value = ''
    this.mst('The new todoItem is upadated Successfully !!!')
  }

  onRemoveTodo(todo : ItodoArr){
    let isConfire = confirm('Are you sure want to remove this todo !!!')
    if(isConfire){
    let getIndex = this.todoArr.findIndex(t=> t.todoId === todo.todoId)
    this.todoArr.splice(getIndex, 1)
    this.mst('The new todoItem is removed Successfully !!!')
    }
  }

}
