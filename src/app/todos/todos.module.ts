import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { RouterModule } from '@angular/router';
import { DeleteTodoModalComponent } from './delete-todo-modal/delete-todo-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenAddEditTodoComponent } from './template-driven-add-edit-todo/template-driven-add-edit-todo.component';


@NgModule({
  declarations: [TodosListComponent, 
    AddEditTodoComponent, 
    DeleteTodoModalComponent,
    TemplateDrivenAddEditTodoComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TodosListComponent,
    AddEditTodoComponent
    ],
  providers :[],
  entryComponents: [DeleteTodoModalComponent]
}
)
export class TodosModule { }
