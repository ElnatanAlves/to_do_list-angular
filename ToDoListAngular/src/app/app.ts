import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Usando signals para reatividade moderna
  todoList = signal<TodoItem[]>([]);
  newTask = signal<string>('');

ngOnInit() {
  const storedTasks = localStorage.getItem('todoList');
  if (storedTasks) {
    this.todoList.set(JSON.parse(storedTasks));
  }
}

  addTask(): void {
    const taskValue = this.newTask().trim();
    if (taskValue !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: taskValue,
        completed: false
      };
  
      this.todoList.update(list => [...list, newTodoItem]);
      this.newTask.set('');
      console.log(this.todoList());
    }
    localStorage.setItem('todoList', JSON.stringify(this.todoList()));
  }

  toggleCompleted(index: number): void {
    this.todoList.update(list => 
      list.map((item, i) => 
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
    localStorage.setItem('todoList', JSON.stringify(this.todoList()));
  }

  deleteTask(id: number): void {
    this.todoList.update(list => list.filter(item => item.id !== id));
    console.log(this.todoList());
  localStorage.setItem('todoList', JSON.stringify(this.todoList()));
  }
}