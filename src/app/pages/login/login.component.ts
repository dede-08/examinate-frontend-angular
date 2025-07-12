import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router:Router) {

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
              this.loginService.setUser(user);
              console.log("Usuario actual:", user);

              if(this.loginService.getUserRole() == "ADMIN"){
                //dashboard admin
                //window.location.href = '/admin';
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
              }
              else if(this.loginService.getUserRole() == "NORMAL"){
                //user dashboard
                //window.location.href = '/user-dashboard'
                this.router.navigate(['user-dashboard']);
                this.loginService.loginStatusSubject.next(true);
              }
              else{
                this.loginService.logOut();
              }
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
        this.snack.open('Detalles invalidos , vuelva a intentarlo !!', 'Aceptar',{
          duration:3000
        });
      }
    );
  }

}
