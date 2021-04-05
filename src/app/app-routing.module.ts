import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AddEditTodoComponent } from './todos/add-edit-todo/add-edit-todo.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';

const routes: Routes = [
  {path:'todos', component : TodosListComponent},
  {path:'add-edit', component: AddEditTodoComponent},
  { path: '', redirectTo: 'todos', pathMatch: 'full'},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
