import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account/account.service';
import { UserAccount } from 'src/app/models/user.model';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  public async login(): Promise<void> {
    if (this.form.invalid) return;

    const user: UserAccount = {
      email: this.email?.value,
      password: this.password?.value
    }

    try {
      const response = await lastValueFrom(this.accountService.login(user));
      
      Swal.fire({
        title: 'Bienvenido!',
        text: response.data.fullName,
        icon: 'success'
      });

      this.form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña no válidos.',
        icon: 'error'
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
