import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My base-angular';

  showMsg = true;

  switchValue = "three";


  styleObj = {
    color: 'red',
    fontWeight: 'bold'
  };

  intVal = 6;

  readMe(id)  {
    alert("Danger Button Clicked - " + id);
  }

  showMe(){
    console.log("Button Clicked")
  }
}
