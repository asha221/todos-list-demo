import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { RouterModule } from '@angular/router';
import {TodoService} from './todo.service';


@NgModule({
  declarations: [TodosListComponent, AddEditTodoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TodosListComponent,
    AddEditTodoComponent
    ],
  providers :[TodoService]
}
)
export class TodosModule { }
