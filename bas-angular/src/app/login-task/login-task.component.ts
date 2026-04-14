import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-task',
  templateUrl: './login-task.component.html',
  styleUrls: ['./login-task.component.css']
})
export class LoginTaskComponent implements OnInit {

  user = {
    id: 1,
    firstName: "Milen",
    lastName: "Eldo",
    city: "New York",
    citycode: "NY",
    dob: "11/12/2003",
    salary: 5778
  }

  style = {
    color: 'red',
    fontWeight: 'bold'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
