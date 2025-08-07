import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  textError: any = {
    'Email not confirmed': 'Por favor, confirma tu correo electrónico antes de iniciar sesión.',
    'Invalid login credentials': 'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.'
  }
  

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  async login() {

    if (this.form.invalid) return;

    const payload = {
      email: this.form.value.email,
      password: this.form.value.password 
    }
    await this._authService.login(payload).then((data: any) => {
      if(data.data.user) {
        this._router.navigate(['/dashboard/vehiculos']);
        return;
      }
      if(data.error && data.error.message) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un problema...",
          text: `${this.textError[data.error.message]}`,
          confirmButtonText: "Entendido"
        });
      }
    }).catch((error: any) => {
      console.log(error);
    })


  }

}
