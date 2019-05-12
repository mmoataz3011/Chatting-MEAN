import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

//For proxy config
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
//services
import {UserService} from './services/user.service';
import {ChatService} from './services/chat.service';
//forms Module
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ActiveListComponent } from './components/active-list/active-list.component';
import { MessageComponent } from './components/message/message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes:Routes=[
  {path:'',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  { path: 'chat' ,children: [
    { path: ':chatWith', component: ChatRoomComponent },
    { path: '**', redirectTo: '/chat/chat-room', pathMatch: 'full' }
  ] },
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ChatRoomComponent,
    ActiveListComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },UserService,ChatService],
  bootstrap: [AppComponent]
})

export class AppModule { 

  

}
