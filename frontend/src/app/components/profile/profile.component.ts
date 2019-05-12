import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User:any= this.user.getUserData();
  oldPassword:any;
  newPassword:any;
  compared:any;
  constructor(private user:UserService,private router:Router) { }

  ngOnInit() {

    if(!this.user.isLoggedIn())
     {
       alert('Please Login to Access this page');
       this.router.navigate(['login']);
     }
     console.log(this.User);

     }

    logout()
    {
      this.user.logOut();
      this.router.navigate(['login']);
    }

   

}
