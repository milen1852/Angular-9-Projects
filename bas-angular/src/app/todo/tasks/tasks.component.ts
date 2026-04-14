import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  value = 3;

  style = {
    color: 'blue',
    fontWeight: 'bold'
  };

  users = [
    {id: 100, name: "Milen"},
    {id: 112, name: "Minnu"},
    {id: 121, name: "Jenny"},
    {id: 133, name: "Kiran"},
    {id: 145, name: "Melvin"}
  ]
  columnCount = 1;


  className1 = 'one';
  className2 = 'two';

  hrefVal = "http://google.com"

  placeHolderVal = "Enter Password"

  firstname = ' ';

  readFirstName(){
    console.log(this.firstname)
    alert(this.firstname)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
