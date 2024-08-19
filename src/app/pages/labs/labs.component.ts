import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa CommonModule aquí
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'] // Cambia styleUrl a styleUrls
})
export class LabsComponent {
  title = 'Mi primera app en Angular, este es un cambio para ver si funciona';
  tareas = signal(["Estudiar Angular", "Hacer una app", "Publicarla", "Compartirla", "Hacer un curso"]);
  name = signal("Arturo Solares");
  age = 24;
  img = "https://via.placeholder.com/150/808080/FFFFFF?text=Test+Image";
  disabled = false;
  person = signal({
    name: "Arturo Solares",
    age: 24,
    avatar: "https://media.licdn.com/dms/image/D4E03AQGVcX1H67XxhQ/profile-displayphoto-shrink_400_400/0/1721235549804?e=1729123200&v=beta&t=qOCd93R9fsNCB0ESvz1OOMhh48ztqAJVxO9ByJc5fxw",
  });

  colorCtrl = new FormControl();
  textCtrl = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable:true
  });
  nameCtrl = new FormControl("Arti",{
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  constructor(){
    this.colorCtrl.valueChanges.subscribe(colorValue => console.log(colorValue));

    this.textCtrl.valueChanges.subscribe(textValue => console.log(textValue));
  }

  onClick() {
    alert("Excelente, ya se como manejar eventos en Angular");
    console.log("Excelente, ya se como manejar eventos en Angular");
  }

  changeHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
    this.name.set(inputElement.value);
  }

  keyDoenHandler(event: KeyboardEvent) {
    // console.log(event);
    const inputElement = event.target as HTMLInputElement;
    this.name.set(inputElement.value);
  }

  inputHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.name.set(inputElement.value);
  }

  changeAge(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.person.update(p => {
      p.age = +inputElement.value;
      return p;
    });
  }

  changeName(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value
    this.person.update(person => {
      person.name = newValue;
      return person;
    });
  }
}
