import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService) {

  }

  ngOnInit(): void {

  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim == null) {
      this.snack.open('el nombre de usuario es requerido', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim == null) {
      this.snack.open('la contraseña es requerida', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Respuesta recibida:", data);

        if (data && data.token) {
          this.loginService.loginUser(data.token);

          this.loginService.getCurrentUser().subscribe(
            (user: any) => {
              console.log("Usuario actual:", user);
            },
            (error) => {
              console.error("Error al obtener usuario:", error);
            }
          );
        } else {
          console.error("No se recibió un token válido.");
          console.debug("Valor devuelto por el backend:", JSON.stringify(data));
        }
      },
      (error) => {
        console.error("Error al generar token:", error);
      }
    )
  }

}
