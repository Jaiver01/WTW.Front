import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account/account.service';
import { User } from 'src/app/models/user.model';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    lastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    documentType: this.fb.control('', [Validators.required]),
    document: this.fb.control('', [Validators.required, Validators.minLength(5)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  public async register(): Promise<void> {
    if (this.form.invalid) return;

    const user: User = {
      id: 0,
      data: {
        id: 0,
        name: this.name?.value,
        lastName: this.lastName?.value,
        documentType: this.documentType?.value,
        document: this.document?.value,
        email: this.email?.value
      },
      password: this.password?.value
    }

    try {
      await lastValueFrom(this.accountService.register(user));
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al intentar crear el registro, por favor intente nuevamente.',
        icon: 'error'
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get documentType() {
    return this.form.get('documentType');
  }

  get document() {
    return this.form.get('document');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
