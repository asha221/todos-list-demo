import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interface/todo';
import { TodoService } from '../todo.service';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTodoModalComponent } from '../delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  todos: ITodo[] = [];
  search$!: Observable<ITodo[]>;
  todoListSubscriber: any;
  searchSubscriber: any;
  isLoading: boolean = false;
  successMessage: string = '';
  

  constructor(private todoService: TodoService, private modalService: NgbModal) { }
  
  ngOnInit() { 
    // on the page load we are loading the data
    this.loadTodos();

    /** Search todo feature */
    let searchBox = document.getElementById('search-box');
    this.search$ = fromEvent(<HTMLInputElement>searchBox, 'input').pipe(
      tap((event:any) => console.log(event)),
      // tap operator is logging that event
      map((event: KeyboardEvent) => {
        // map operator will take the data emited in that observable we can manipulate that value and finally we can reurn one value
        // map operator taking the event data and return the value which we enter in the search box
        // return event.target.value; // We will get compilation error.
        return (<HTMLInputElement>event.target).value;
        // event.target).value contains the latest value which we entered in the search box
        // return event.target['value']; // We can do like this also to avoid TS compilation errors.
      }),
      tap(value => console.log(value)),
      debounceTime(250),
      // we don't want to response for every key stroke so we are waiting for sometime
      switchMap(text => {
        // here text means the text we entered 
        // switchMap operator generally use for nested observables 
        this.isLoading = true;
        return this.todoService.getTodos(text);
        // these will return the search todo data 
      })
    );

    this.searchSubscriber = this.search$.subscribe((data: ITodo[]) => {
      this.isLoading = false;
      this.todos = data;
      console.log(this.todos);
    });

  }

    loadTodos() {
      this.isLoading = true;
      this.todoListSubscriber = this.todoService.getTodos()
        .subscribe((data: ITodo[]) => {
          this.todos = data;
          this.isLoading = false;
          console.log(this.todos);
        });
    }
  
  confirmDelete(todo:any) {
    let deleteModalReference = this.modalService.open(DeleteTodoModalComponent, {
      // here we are not using <app-delete-todo-modal> tag but some service is envoking that is called 'EntryComponent'. for that we need to register these into todo.module as a EntryComponent
      // this.modalService.open() invoking the delete button window
      // to open the delete dialogbox we need to give DeleteTodoModalComponent which contains the code for design of these dialogue box
      backdrop: 'static',
      // static means when we click outside of the dialogue box it won't be closed
      keyboard: false,
      // false means when we click esc button in keyboard it won't be closed
      windowClass: 'delete-modal'
      // delete-modal is a css class we need to add to these modal window to do some changes in the apperence of the dialogue box
    });

    deleteModalReference.componentInstance.todo = todo;
    // by the above statememt we are sending the details of which todo we need to delete to the delete component
    // componentInstance means the component which we have used for opening the modal window
    deleteModalReference.result.then((result) => {
      // .then() method have 2 callbacks 1.for close callback 2.for dismiss callback  
      console.log(result);
      this.loadTodos();
      this.successMessage = 'Todo deleted successfully';
      // here instead of todo we can specifie the name of the todo by using todo.titl string
    }, (reason) => {
        // reason is clicked on cross button or No button clicked in delete html
      console.log(reason);
      console.log('Modal dismissed');
    });
  }

}