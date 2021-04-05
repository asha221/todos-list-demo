import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';



@NgModule({
  declarations: [TodosListComponent, AddEditTodoComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosListComponent,
    AddEditTodoComponent]
}
)
export class TodosModule { }
