import { Router } from '@angular/router';
import { UserFunctions } from './../../helpers/userFunctions';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visorPassword = false;
  users: Usuario[];

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((usersSnapshot) => {
      this.users = [];
      usersSnapshot.forEach((userData: any) => {
        this.users.push({
          id: userData.payload.doc.id,
          ...userData.payload.doc.data()
        });
      });
    });
  }

  login(): void {
    const user = UserFunctions.findUserByEmailAndPassword(this.users, { ...this.form.value });
    if (user != null) {
      // console.log("Welcome");
      Swal.fire({
        title: 'Correct credentials',
        text: 'Welcome to the system',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      }).then(() => {
        if (user.type === 'user') {
          this.router.navigate(['/interfaz-user']);
          localStorage.setItem('user', JSON.stringify(user));
        }else {
          this.router.navigate(['/interfaz-admin']);
          localStorage.setItem('admin', JSON.stringify(user));
        }
      });
    }
    else {
      // console.log("Incorrect credentials");
      Swal.fire({
        title: 'Wrong credentials',
        text: 'Try it again, please',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  hideShowPassword(): void {
    const inputPass = document.getElementById('pass') as HTMLInputElement;
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
      this.visorPassword = true;
    }
    else {
      inputPass.type = 'password';
      this.visorPassword = false;
    }
  }

}
