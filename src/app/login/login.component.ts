import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  result: any;

  loginform = this.builder.group({
    posts: this.builder.array([
      this.builder.group({
        id: this.builder.control('', Validators.required),
        title: this.builder.control('', Validators.required),
        author: this.builder.control('', Validators.required),
      })
    ]),
    comments: this.builder.array([
      this.builder.group({
        id: this.builder.control('', Validators.required),
        body: this.builder.control('', Validators.required),
        postId: this.builder.control('', Validators.required),
      })
    ]),
    profile: this.builder.group({
      name: this.builder.control('', Validators.required),
    })
  });

  proceedlogin() {
    if (this.loginform.valid) {
      // Extracting values from the form
      const id = this.loginform.get('posts').get('id')?.value;
      const title = this.loginform.get('posts').get('title')?.value;
      const author = this.loginform.get('posts').get('author')?.value;

      // Continue with the rest of your logic...
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
