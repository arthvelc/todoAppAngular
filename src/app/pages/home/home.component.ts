import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { JsonPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/*
Signal
computed
effect

Estos son los 3 elementos importantes en el mundo de la reactividad en Angular
*/

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
  tasks = signal<Task[]>([]); //Estado por defecto del array de tasks

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators:[
      Validators.required,
      //Validators.minLength(4)
    ]
  });

  filter = signal<'all' | 'pending' | 'completed'>("all"); //signal es un observable que emite valores iniciales y posteriores

  tasksByFilters= computed(() => {
    const filter=this.filter();
    const task = this.tasks()

    if(filter === "pending"){
      return task.filter((task) => !task.completed);
    }

    if(filter === "completed"){
      return task.filter((task) => task.completed);
    }

    return task;
  })

  //Construnctor
  constructor(){
  }

  injector = inject(Injector);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const storage = localStorage.getItem('tasks'); //habia llamado el key task, pero era el key tasks

    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks); //Seteamos el estado de las tareas con el valor que se encuentra en el local storage, el set es un método que nos permite cambiar el valor de un estado
    }

    this.trackTasks();
  }


  trackTasks(){
     //Efect no retorna ningun valor como signal o computed(estados derivados) si no que este nos ayuda a vigilar un estado y a partir de ello ejecutar una lógica.
     effect(() =>{
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector})
  }

  changeHandler(){
    const newTask = this.newTaskCtrl.value;
    if(this.newTaskCtrl.valid){
      if(newTask.trim() !== ""){
        this.addTask(newTask);
        this.newTaskCtrl.setValue("");
      }
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

  deleteTaskCompleted(){
    this.tasks.update(tasks => (tasks.filter( task => !task.completed)))
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

  updateTaskMode(index: number){
    this.tasks.update(task =>{
      return task.map((task, position)=>{
        if(position === index){
          return { ...task, editing: true }
        }
        return {
          ...task, editing: false
        };
      })
    })
  }

  updateTaskTitle(index: number, event: Event){
    const inputElement = event.target as HTMLInputElement;
    const newTitle = inputElement.value;

    this.tasks.update(task =>{
      return task.map((task, position) =>{
        if(position===index){
          return{
            ...task, title: newTitle, editing: false
          }
        }
        return task; // Add this line to return the original task
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
