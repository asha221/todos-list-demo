import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ITodo } from '../interface/todo';
import { ICategory } from '../interface/category';
import { ITag } from '../interface/tag';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTodos(searchTerm?: string): Observable<ITodo[]>{
    let url = `${this.baseUrl}/todos`;
    // these is the url that hit the server
    if(searchTerm) {
      url += `?search=${searchTerm}`
      // if we have any search term we are appending that searchTerm a query prameter to that url
    }  

    return this.http.get(url)
    // here instead of using all these pipe and map methods we can write like these also  return this.http.get<ITodo[]>(url). here <ITodo[]> is a generic method
      .pipe(
        map(response => {
          return response as ITodo[];
          // here we are returing an observable of todos if we don't typecast it typscript compiler don't understand
          // here we are using pipe operator because we can't call any opeartors on observables directly
        })
      )
      // from here we will get the list of observables of Todos[]
  }

  getTodo(todoId: string): Observable<ITodo>{
    return this.http.get(`${this.baseUrl}/todos/${todoId}`)
    //here we can write  ${this.baseUrl}/todos` also
      .pipe(
        map(response => {
          return response as ITodo;
        })
      )
  }

  getCategories(): Observable<ICategory[]>{
    return this.http.get(`${this.baseUrl}/categories`)
      .pipe(
        map(response => {
          return response as ICategory[];
        })
      )
  }

  getTags(): Observable<ITag[]>{
    return this.http.get(`${this.baseUrl}/tags`)
      .pipe(
        map(response => {
          return response as ITag[];
        })
      )
  }

  updateTodo(payload:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/todos`, payload);
  }

  saveTodo(payload:any): Observable<any> {
    // post() method is used to crete a new resource in a database
    return this.http.post(`${this.baseUrl}/todos`, payload);
  }

 
  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${todoId}`);
  }
}
