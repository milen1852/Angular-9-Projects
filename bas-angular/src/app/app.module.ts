import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { HoverEffectPipe } from './hover-effect.pipe';
import { LoginTaskComponent } from './login-task/login-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HoverEffectPipe,
    LoginTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
