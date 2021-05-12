import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import {TodosModule} from './todos/todos.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodosModule,
    SharedModule,
    HttpClientModule,
    // to make server calls in our application we need to import and register HttpClientModule. these contians HttpClient service. that service we can use by injecting in our component
    RouterModule,
    NgbModule
    // by these all the services of the NgbModulewill be register in the appmodule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
