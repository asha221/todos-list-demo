import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  constructor(private http:HttpClient) { }
  isLoading:boolean=false;
  todos: any[]=[];
  ngOnInit() {
    this.isLoading=true;
    this.http.get('https://todos-api-dev.herokuapp.com/todos').subscribe((data: any) => {
    this.isLoading=false; 
    this.todos = data;
      console.log('todos received data',this.todos);
    });
    
  }

}
