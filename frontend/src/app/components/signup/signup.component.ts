import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser: any = {
    username: '',
    email: '',
    password: ''
  };
  check: any = {
    filter: '',
    data: ''
  };
  foundUser:any;
  foundEmail:any;

  constructor(private user: UserService, private router: Router) {}

   ngOnInit() {

       }
  onSubmit({ form1, valid }) {
    if (!valid) return alert('Please Complete the fields');

    this.user.signUp(this.newUser).subscribe(res => {
      if (!res.success)
        return alert('UserName or Email already registered ,Read the errors');
      alert('User has been successfully registered');
      this.router.navigate(['/login']);
    });
  }


 checkExist(filter) {
    this.check.filter = filter;
    if(filter=='username')
    this.check.data = this.newUser.username;
    else this.check.data=this.newUser.email;

    this.user.check(this.check).subscribe(res => {
     if(filter=='username') this.foundUser=res.found;
     else this.foundEmail=res.found;
    });
  }



}
