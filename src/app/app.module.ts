import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule } from '@angular/material/button';
// import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import * as $ from 'jquery';
import { TotemSocketService } from './totem-socket.service';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes:Routes = [
  {
    path: '',
    component:DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [TotemSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
