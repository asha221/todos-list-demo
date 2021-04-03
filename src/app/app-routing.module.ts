import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTodoComponent } from './todos/add-edit-todo/add-edit-todo.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';

const routes: Routes = [
  {path:'list', component : TodosListComponent},
  {path:'add-edit', component: AddEditTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
