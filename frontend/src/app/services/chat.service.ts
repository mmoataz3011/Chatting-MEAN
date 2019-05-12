import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Message } from '../models/message.model';
import { environment } from '../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {UserService} from '../services/user.service';


import * as data from '../data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import url from 'proxy-config.json';

const CHAT_PATH = environment.chatPath;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: any;
  //private chatUrl: string = environment.chatUrl;
//  private chatUrl: string = url["/"].target.substring(0,url["/"].target.length-1);
  private apiUrl: string = `messages`;
  private usersUrl: string = `users`;

  
  constructor(private http:HttpClient,private user:UserService) { }

  connect(username: string, callback: Function = () => {}): void {

    //try
    // initialize the connection
    this.socket = io(window.location.origin, { path: CHAT_PATH });
    this.socket.on('error', error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    });

    this.socket.on('connect', () => {
      this.sendUser(username);
      console.log('connected to the chat server');
      callback();
    });
  }
  isConnected(): boolean {
    if (this.socket != null) {
      return true;
    } else {
      return false;
    }
  }

  sendUser(username: string): void {
    this.socket.emit('username', { username: username });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
  getConversation(name1: string, name2: string): any {
    let url = this.apiUrl;
    if (name2 != 'chat-room') {
      let route = '/' + name1 + '/' + name2;
      url += route;
    }

    //let authToken = JSON.parse(localStorage.getItem(data.MAAA));
    //console.log(authToken);
    // prepare the request
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'//,
      //'Authorization':'Bearer '+authToken
    });
    let options = ({ headers: headers });

    // POST
    let observableReq = this.http.get(url)
    .pipe(map(this.extractData));

    return observableReq;
  }

  getUserList(): any {
    let url = this.usersUrl;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = ({ headers: headers });

    // POST
    let observableReq = this.http.get(url).pipe(map(this.extractData));

    return observableReq;
  }

  receiveMessage(): any {
    let observable = new Observable(observer => {
      this.socket.on('message', (data: Message) => {
        observer.next(data);
      });
    });

    return observable;
  }
  receiveActiveList(): any {
    let observable = new Observable(observer => {
      this.socket.on('active', data => {
        observer.next(data);
      });
    });

    return observable;
  }

  sendMessage(message: Message, chatWith: string): void {
    this.socket.emit('message', { message: message, to: chatWith });
  }

  getActiveList(): void {
    this.socket.emit('getactive');
  }

  extractData(res: Response): any {
    let body = JSON.parse(JSON.stringify(res));
    return body || {};
  }

}
