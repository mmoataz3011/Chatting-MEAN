import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {ChatService} from './../../services/chat.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser:any={
    email:'',
    password:''
  }
  constructor(private user:UserService,private router:Router,public chatService:ChatService) { }

  ngOnInit() {
    this.user.logOut();
  }

onSubmit({form1,valid})
{
  if(!valid)
  return alert('Compelete the fields');
  this.user.login(this.newUser).subscribe(res=>{
    if(!res.success)
     return alert('Email or password is wrong ,try again');
    alert('Login Successful');
    this.user.saveData(res.token,JSON.stringify(res.user));
    this.chatService.connect(res.user.username);
    this.router.navigate(['profile']);
  });
}



}
