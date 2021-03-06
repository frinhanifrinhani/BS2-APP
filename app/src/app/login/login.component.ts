import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './../_services/authentication.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.builderLoginForm()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private builderLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // f retorna os controles do form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.login(this.loginForm.value)
      .pipe()
      .subscribe(
        data => {
          location.reload();
        }, errorResponse => {
          this.error = errorResponse.error.error;
          this.loading = false;
        }
      );
  }
}
