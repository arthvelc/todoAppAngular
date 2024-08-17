import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})

export class LabsComponent {
  title = 'Mi primera app en Angular';
  tareas = signal(["Estudiar Angular", "Hacer una app", "Publicarla", "Compartirla", "Hacer un curso"
  ]);
  name = signal("Arturo Solares");
  age = 24;
  img= "https://via.placeholder.com/150/808080/FFFFFF?text=Test+Image"
  disabled = false;
  person ={
    name: "Arturo Solares",
    age: 24,
    avatar :"https://media.licdn.com/dms/image/D4E03AQGVcX1H67XxhQ/profile-displayphoto-shrink_400_400/0/1721235549804?e=1729123200&v=beta&t=qOCd93R9fsNCB0ESvz1OOMhh48ztqAJVxO9ByJc5fxw",
  }

  onClick(){
    alert("Excelente, ya se como manejar eventos en Angular");
    console.log("Excelente, ya se como manejar eventos en Angular");
  }
  
  changeHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);

    this.name.set(inputElement.value);
  }   

  keyDoenHandler(event: KeyboardEvent){
    // console.log(event);
    const inputElement = event.target as HTMLInputElement;

    this.name.set(inputElement.value);
  }

  inputHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.name.set(inputElement.value);
  }
}
