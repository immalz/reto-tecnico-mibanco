import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { matchFieldsValidator } from '../../../shared/utils/match-fields.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  hidePassword = true;
  hideSecondPassword = true;

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    },{
      validators: matchFieldsValidator('password', 'repeatPassword')
    });
  }

  async register() {

    if (this.form.invalid) return;
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password 
    };

    await this._authService.signUp(payload);
    this._router.navigate(['/acceso']);

  }
}
