import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';



export interface TodoItem{
  id:number;
  task:string;
  completed: boolean;
}
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  todoList :TodoItem[]= [];
  newTask : string='';
  
  addTask ():void{
    if(this.newTask.trim()!==''){
      const newTodoItem :TodoItem ={
        id: Date.now(),
        task: this.newTask,
        completed: false
      }
      this.todoList.push(newTodoItem)
      this.newTask=''
      console.log(this.todoList)
    }
  }
}
