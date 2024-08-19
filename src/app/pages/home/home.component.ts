import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa CommonModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Cambia styleUrl a styleUrls
  providers: [JsonPipe], // Asegúrate de que JsonPipe está en providers
})
export class HomeComponent {
  title = 'Página Inicial';
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: "Amar a Ollincita 🥰",
      completed: true
    }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.pattern('^(?!.*\\s{1,}).*$')
    ]
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue("");
    }

  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update(tasks => (tasks.filter((task, position) => position !== index)))
  }

  updateTask(index: number){
    this.tasks.update(task =>{
      return task.map((task, position)=>{
        if(position === index){
          return { ...task, completed: !task.completed }
        }
        return task;
      })
    })
  }
}