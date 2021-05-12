import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AddEditTodoComponent } from './todos/add-edit-todo/add-edit-todo.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { TemplateDrivenAddEditTodoComponent} from './todos/template-driven-add-edit-todo/template-driven-add-edit-todo.component';

const routes: Routes = [
  {  path:'todos', component : TodosListComponent},
  { path: 'todo/:id', component:  AddEditTodoComponent},
  { path: 'template-todo/:id', component:  TemplateDrivenAddEditTodoComponent},
    
  { path: '', redirectTo: 'todos', pathMatch: 'full'},
  { path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
    // enableTracing is an event by which we can debug the router events
  ],
  declarations: []
})
export class AppRoutingModule { }
